import * as nodered from "node-red";

export interface ValueChangeDetectorNodeProperties extends nodered.NodeDef {
    key: string;
    value: string;
}
