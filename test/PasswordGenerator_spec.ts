import "mocha";
import { expect } from "chai";
import { generatePassword } from "../lib/PasswordGenerator";

describe.only("PasswordGenerator", () => {
    it("should return true for the first time", async () => {
        const result = await generatePassword(10);
        console.log(`before: "${result}"`)
        expect(result).to.lengthOf(10);
    });
});