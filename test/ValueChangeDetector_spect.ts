import "mocha";
import { expect } from "chai";
import { ValueChangeDetector } from "../lib/ValueChangeDetector";

describe("ValueChangeDetector", () => {
    let instance: ValueChangeDetector;

    beforeEach(() => {
        instance = new ValueChangeDetector();
    });

    describe("isUpdated", () => {
        it("should return true for the first time", () => {
            const result = instance.isUpdated({ key: 1, value: 1 });
            expect(result).to.equal(true);
        });

        it("should return false when specifying the same data", () => {
            const data = { key: "key", value: "value" };
            instance.update(data);
            const result = instance.isUpdated({ ...data });
            expect(result).to.equal(false);
        });

        it("should return true for different key", () => {
            instance.update({ key: "key", value: "value" });
            const result = instance.isUpdated({ key: "key2", value: "value" });
            expect(result).to.equal(true);
        });

        it("should convert number to string for key", () => {
            instance.update({ key: 1, value: "value" });
            const result = instance.isUpdated({ key: "1", value: "value" });
            expect(result).to.equal(false);
        });

        it("should convert object to string for key", () => {
            instance.update({ key: { obj: 1 }, value: "value" });
            const result = instance.isUpdated({ key: { obj: 1 }, value: "value" });
            expect(result).to.equal(false);
        });
    });
});