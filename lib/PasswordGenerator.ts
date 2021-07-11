import * as crypto from "crypto";
import { promisify } from "util";

const AsciiRange = {
    /** space */
    min: 32,
    /** childe mark ~ */
    max: 126,
}
const optRegexes = {
    space: " ",
    special: "!\"#\\$%&'\\(\\)\\*\\+,-./:;<=>\\?@\\[\\\\\\]\\^_`\\{|\\}~",
    number: "\\d",
};

export interface DisableOptions {
    space?: boolean;
    special?: boolean;
    number?: boolean;
}

export async function generatePassword(length: number, disableOpts?: DisableOptions): Promise<string> {
    if (length < 5) {
        throw new Error("Password length must be longer than 5.");
    }

    let result = "";
    const regex = createRegex(disableOpts)

    while (true) {
        const bytes = await promisify(crypto.randomBytes)(length * 2);
        const byteArray = Array.from(bytes);
        const filtered = byteArray.filter(isInAsciiRange);
        result += String.fromCharCode(...filtered);
        if (regex) {
            result = result.replace(regex, "");
        }

        if (result.length >= length) {
            result = result.slice(0, length);
            break;
        }
    }
    return result;
}

function isInAsciiRange(value: number) {
    return AsciiRange.min <= value && value <= AsciiRange.max;
}

function createRegex(disableOpts?: DisableOptions): RegExp | undefined {
    if (!disableOpts) {
        return undefined;
    }
    let reg = "";
    if (disableOpts?.space) { reg += optRegexes.space };
    if (disableOpts?.special) { reg += optRegexes.special };
    if (disableOpts?.number) { reg += optRegexes.number };

    return new RegExp(`[${reg}]`, "g");
}