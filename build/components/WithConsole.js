import React, { useEffect, useLayoutEffect, } from "react";
import { consoleEmitter } from "../utils/console-utils.js";
import { useProgress } from "./Progress/useProgress.js";
import { progressEmitter } from "../utils/commands.js";
export function WithConsole({ children, autoRefreshInterval, path = "console", }) {
    useLayoutEffect(() => {
        linkConsoleToProgress(path);
    }, []);
    const progress = useProgress();
    useEffect(() => {
        if (autoRefreshInterval) {
            const timer = setInterval(() => {
                progress.refresh();
            }, autoRefreshInterval);
            return () => {
                clearInterval(timer);
            };
        }
        else {
            return () => { };
        }
    }, [autoRefreshInterval]);
    return React.createElement(React.Fragment, null, children);
}
function linkConsoleToProgress(path) {
    consoleEmitter.on("console", (stream, message) => {
        const important = stream === "error" || stream === "warn";
        progressEmitter.log(path, `${stream}: ${message}`, important ? 'sync' : 'async');
    });
    console.log("Console patch: %s %i", "DONE", 1);
}
//# sourceMappingURL=WithConsole.js.map