import * as nodered from "node-red";
import { PasswordGeneratorNodeProperties } from "./PasswordGeneratorNodeDef";

declare const RED: nodered.EditorRED;
const nodeName = "password-generator";

RED.nodes.registerType<PasswordGeneratorNodeProperties>(nodeName, {
    category: "function",
    color: "#a6bbcf",
    defaults: {
        name: { value: "" },
        length: { value: "", required: true, validate: RED.validators.number() },
        setTo: { value: "" },
    },
    inputs: 1,
    outputs: 1,
    icon: "fas fa-not-equal",
    label: function () {
        return this.name || nodeName;
    },
});
