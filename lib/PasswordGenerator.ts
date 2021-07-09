import * as crypto from "crypto";
import { promisify } from "util";

const AsciiRange = {
    /** space */
    min: 32,
    /** childe mark ~ */
    max: 126,
}

export async function generatePassword(size: number): Promise<string> {
    let result = "";
    while (true) {
        const bytes = await promisify(crypto.randomBytes)(size * 2);
        const byteArray = Array.from(bytes);
        const filtered = byteArray.filter(isInAsciiRange);
        result += String.fromCharCode(...filtered);
        if (result.length >= size) {
            result = result.slice(0, size);
            break;
        }
    }
    return result;
}

function isInAsciiRange(value: number) {
    return AsciiRange.min <= value && value <= AsciiRange.max;
}