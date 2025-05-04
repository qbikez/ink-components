import React from "react";
import { render } from "./dependencies/tuir.js";
import { patchConsole, WithProgress, WithConsole } from "./dependencies/ink-components.js";
import { Root } from "./Root.js";
import ansiEscapes from "ansi-escapes";
export function cli(params) {
    patchConsole();
    var root = (React.createElement(WithProgress, null,
        React.createElement(WithConsole, { autoRefreshInterval: 1000 },
            React.createElement(Root, { ...params }))));
    render(root, {
        patchConsole: false,
        debug: false,
        ansiEscapeChars: {
            clearScreen: ansiEscapes.clearScreen
        }
    });
}
export { commandEmitter, progressEmitter } from "./dependencies/ink-components.js";
//# sourceMappingURL=cli.js.map