import "mocha";
import { expect } from "chai";
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
    function createFlow(args?: { length?: number, setTo?: string }) {
        return [
            {
                id: nodeId,
                type: "password-generator",
                length: args?.length || 10,
                setTo: args?.setTo,
                name: "generator-name",
                wires: [[outNodeId]]
            },
            {
                id: outNodeId,
                type: "helper",
            }
        ];
    }
    it("should be loaded", (done) => {
        const flow = createFlow();
        helper.load([valueChangeNode], flow, () => {
            const node = helper.getNode(nodeId);
            expect(node.name).to.equal("generator-name");
            done();
        }).catch(done);
    });
    it("should set value to the property specified in setTo", (done) => {
        const flow = createFlow({ setTo: "payload.value" });
        helper.load([valueChangeNode], flow, () => {
            const node = helper.getNode(nodeId);
            const outNode = helper.getNode(outNodeId);
            outNode.on("input", (msg: any) => {
                expect(msg.payload.value).not.to.be.undefined;
                done();
            });
            node.receive({ payload: 1 });

        }).catch(done);
    });
    it("should set value to msg.payload when neither setTo nor msg.to is set ", (done) => {
        const flow = createFlow();
        helper.load([valueChangeNode], flow, () => {
            const node = helper.getNode(nodeId);
            const outNode = helper.getNode(outNodeId);
            outNode.on("input", (msg: any) => {
                expect(msg.payload).not.to.be.undefined;
                done();
            });
            node.receive({ payload: 1 });

        }).catch(done);
    });
    it("should use msg.to if it is set even if setTo is set", (done) => {
        const flow = createFlow({ setTo: "payload.value" });
        helper.load([valueChangeNode], flow, () => {
            const node = helper.getNode(nodeId);
            const outNode = helper.getNode(outNodeId);
            outNode.on("input", (msg: any) => {
                expect(msg.hoge.hoge).not.to.be.undefined;
                done();
            });
            node.receive({ payload: 1, to: "hoge.hoge" } as any);

        }).catch(done);
    });
});