import * as crypto from "crypto";
import { promisify } from "util";

const AsciiRange = {
    /** space */
    min: 32,
    /** childe mark ~ */
    max: 126,
}

export async function generatePassword(length: number): Promise<string> {
    let result = "";
    while (true) {
        const bytes = await promisify(crypto.randomBytes)(length * 2);
        const byteArray = Array.from(bytes);
        const filtered = byteArray.filter(isInAsciiRange);
        result += String.fromCharCode(...filtered);
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