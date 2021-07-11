import * as nodered from "node-red";

export interface PasswordGeneratorNodeDef
    extends nodered.NodeDef {
    length: number;
    setTo?: string;
}

export interface PasswordGeneratorNodeProperties
    extends nodered.EditorNodeProperties {
    length: number;
    setTo?: string;
}
