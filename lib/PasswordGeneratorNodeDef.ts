import * as nodered from "node-red";

export interface PasswordGeneratorNodeDef
    extends nodered.NodeDef {
    size: number;
    setTo?: string;
}

export interface PasswordGeneratorNodeProperties
    extends nodered.EditorNodeProperties {
    size: number;
    setTo?: string;
}
