import * as nodered from "node-red";
import { generatePassword } from "./PasswordGenerator";
import { PasswordGeneratorNodeDef } from "./PasswordGeneratorNodeDef";
import * as yutolity from "yutolity";

// it can't set to the input event listener now
// using any is workaround but not good
interface PayloadType extends nodered.NodeMessageInFlow {
    to: string;
}

export = (RED: nodered.NodeAPI): void => {
    RED.nodes.registerType("password-generator",
        function (this: nodered.Node, config: PasswordGeneratorNodeDef): void {
            RED.nodes.createNode(this, config);

            this.on("input", async (msg: any, send, done) => {
                const password = await generatePassword(config.size);

                const valueSetPath = msg.to || config.setTo || "payload";
                yutolity.setValue(msg, valueSetPath, password);
                send(msg);
                done();
            });
        });
}
