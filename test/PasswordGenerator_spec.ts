import "mocha";
import * as crypto from "crypto";
import { expect } from "chai";
import * as sinon from "sinon";
import { generatePassword } from "../lib/PasswordGenerator";

describe("PasswordGenerator", () => {
    it("should return true for the first time", async () => {
        const result = await generatePassword(10);
        expect(result).to.lengthOf(10);
    });
    // it.only("should return true for the first time", async () => {
    //     const testData = Buffer.from([31, 32, 126, 127]);
    //     sinon.stub(crypto, "randomBytes")
    //         .callsFake((size: number, cb: (err: Error | null, buf: Buffer) => void) => {
    //             console.log("HEY")
    //             cb(null, testData);
    //         });
    //     const result = await generatePassword(10);
    //     expect(result).to.equal(" ~");
    // });
});