import * as nodered from "node-red";
import * as yutolity from "yutolity";
import { ValueChangeDetector } from "./ValueChangeDetector";
import { ValueChangeDetectorNodeProperties } from "./ValueChangeDetectorNodeProperties";

export = (RED: nodered.NodeAPI) => {
    RED.nodes.registerType("value-change-detector",
        function (this: nodered.Node, config: ValueChangeDetectorNodeProperties): void {
            RED.nodes.createNode(this, config);
            
            const detector = new ValueChangeDetector();

            this.on('input', (msg: any) => {
                const targetValue = yutolity.getValueOf(msg.payload, config.key);
                this.send(msg);
            });
        });
}


