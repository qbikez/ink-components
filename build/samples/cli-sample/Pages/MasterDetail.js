import React, { useState } from "react";
import { Box, Cli, Node, useKeymap, useNodeMap, } from "../dependencies/tuir.js";
import { useProgress, ProgressVisualiser, Frame, ScrollingBox, commandEmitter, } from "../dependencies/ink-components.js";
import cliBoxes from "cli-boxes";
export function MasterDetail() {
    const progress = useProgress();
    const nodeMap = [["list"], ["log"]];
    const { register, control } = useNodeMap(nodeMap, { navigation: "none" });
    const [selectedItem, setSelectedItem] = useState("console");
    const selectedProgress = progress.state.root[selectedItem];
    const keyMap = {
        quit: { input: "q" },
        start: { input: "s" },
        tab: { key: "tab" },
    };
    const { useEvent } = useKeymap(keyMap);
    useEvent("quit", () => {
        process.exit(0);
    });
    useEvent("start", () => {
        commandEmitter.invokeCommand("start", selectedItem, []);
    });
    useEvent("tab", () => {
        control.next();
    });
    const commands = {
        q: async (args) => {
            process.exit(0);
        },
        DEFAULT: async (args) => {
            console.warn("Command invoked!", args);
        },
    };
    return (React.createElement(Box, { flexDirection: "column" },
        React.createElement(Node, { ...register("list") },
            React.createElement(Frame, { height: 10, borderStyle: { ...cliBoxes.doubleSingle } },
                React.createElement(ProgressVisualiser, { progress: progress, onItemSelected: (i) => setSelectedItem(i) }))),
        React.createElement(Node, { ...register("log") },
            React.createElement(Frame, { flexGrow: 1 },
                React.createElement(ScrollingBox, { data: selectedProgress?.log ?? [], width: "100%", title: selectedItem ?? "??" }))),
        React.createElement(Cli, { commands: commands })));
}
//# sourceMappingURL=MasterDetail.js.map