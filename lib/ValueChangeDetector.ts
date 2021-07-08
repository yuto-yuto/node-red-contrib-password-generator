import isEqual from "fast-deep-equal";

interface KeyValue {
    key: unknown;
    value: unknown;
}

export class ValueChangeDetector {
    private currentValues = new Map<string, unknown>();

    public isUpdated(args: KeyValue): boolean {
        const current = this.currentValues.get(this.toString(args.key));
        if (current === undefined) {
            return true;
        }
        return !isEqual(current, args.value);
    }

    public update(args: KeyValue): void {
        this.currentValues.set(this.toString(args.key), args.value);
    }

    private toString(object: unknown): string {
        if (typeof object === "string") {
            return object;
        }
        return String(object);
    }
}