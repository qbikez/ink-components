import React, { useEffect, useLayoutEffect } from "react";
import { consoleEmitter } from "../utils/console-utils.js";
import { useProgress } from "./Progress/useProgress.js";
import { progressEmitter } from "../utils/commands.js";
export function WithConsole({ children, autoRefreshInterval, }) {
    useLayoutEffect(() => {
        linkConsoleToProgress();
    }, []);
    const progress = useProgress();
    useEffect(() => {
        if (autoRefreshInterval) {
            const timer = setInterval(() => {
                progress.dispatch({ type: "refresh" });
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
function linkConsoleToProgress() {
    consoleEmitter.on("console", (stream, message) => {
        if (stream === "warn" || stream === "error") {
            progressEmitter.log("console!", `${stream}: ${message}`);
        }
        else {
            progressEmitter.log("console", `${stream}: ${message}`);
        }
    });
    console.log("Console patch: %s %i", "DONE", 1);
}
//# sourceMappingURL=WithConsole.js.map