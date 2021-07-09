import "mocha";
import { expect } from "chai";
// import * as helper from "node-red-node-test-helper";
import helper = require("node-red-node-test-helper");

import valueChangeNode = require("../lib/PasswordGeneratorNode");

describe("PasswordGeneratorNode", () => {
    before(() => {
        helper.init(require.resolve('node-red'));
    });

    beforeEach((done) => {
        helper.startServer(done);
    });

    afterEach((done) => {
        helper.unload().then(() => helper.stopServer(done));
    });

    const nodeId = "node-id";
    const outNodeId = "out-node-id";
    const flows = [
        {
            id: nodeId,
            type: "password-generator",
            size: 10,
            setTo: "payload.value",
            name: "generator-name",
            wires: [[outNodeId]]
        },
        {
            id: outNodeId,
            type: "helper",
        }
    ];

    it("should be loaded", (done) => {
        helper.load([valueChangeNode], flows, () => {
            const node = helper.getNode(nodeId);
            expect(node.name).to.equal("generator-name");
            done();
        }).catch(done);
    });
    it("should set value to the property specified in setTo", (done) => {
        helper.load([valueChangeNode], flows, () => {
            const node = helper.getNode(nodeId);
            const outNode = helper.getNode(outNodeId);
            outNode.on("input", (msg: any) => {
                expect(msg.payload.value).not.to.be.undefined;
                done();
            });
            node.receive({ payload: 1 });

        }).catch(done);
    });
});