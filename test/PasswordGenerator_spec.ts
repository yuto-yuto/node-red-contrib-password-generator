import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";
import { generatePassword, DisableOptions } from "../lib/PasswordGenerator";

describe("PasswordGenerator", () => {
    afterEach(() => {
        sinon.restore();
    });

    it("should throw an error when length is 4", (done) => {
        generatePassword(4)
            .then(() => done("Error didn't occur."))
            .catch(() => done());
    });

    it("should return password when length is 5", async () => {
        const result = await generatePassword(5);
        expect(result).to.lengthOf(5);
    });

    [
        { regex: /0123456789/, title: "number" },
        { regex: / /, title: "space" },
        { regex: /abcdefghijklmnopqrstuvwxyz/, title: "lowercase" },
        { regex: /ABCDEFGHIJKLMNOPQRSTUVWXYZ/, title: "uppercase" },
        { regex: /!\"#\$%&'\(\)\*\+,-.\//, title: "special characters group 1" },
        { regex: /:;<=>\?@/, title: "special characters group 2" },
        { regex: /\[\\\]\^_`/, title: "special characters group 3" },
        { regex: /\{|\}~/, title: "special characters group 4" },
    ].forEach((testData) => {
        it(`should contain ${testData.title} without option`, async () => {
            const fakeData = Array.from(Array(256).keys());
            sinon.stub(Array, "from").returns(fakeData);
            const result = await generatePassword(256);
            expect(result).to.match(testData.regex);
        });
    });

    it("should not contain number when option number is true", async () => {
        const fakeData = Array.from(Array(256).keys());
        sinon.stub(Array, "from").returns(fakeData);
        const result = await generatePassword(256, { number: true });
        expect(result).not.to.match(/\d/);
    });

    it("should not contain space when option space is true", async () => {
        const fakeData = Array.from(Array(256).keys());
        sinon.stub(Array, "from").returns(fakeData);
        const result = await generatePassword(256, { space: true });
        expect(result).not.to.contain(" ");
    });

    it("should not contain special characters when option space is true", async () => {
        const fakeData = Array.from(Array(256).keys());
        sinon.stub(Array, "from").returns(fakeData);
        const result = await generatePassword(256, { special: true });
        expect(result).not.to.match(/[\[!\"#\$%&'\(\)\*\+,\-./:;<=>\?@\[\\\]\^_`{|}\]]/);
    });
});