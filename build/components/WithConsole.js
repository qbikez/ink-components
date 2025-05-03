import React, { useEffect } from "react";
import { consoleEmitter } from "../utils/console-utils.js";
import { useProgress } from "../utils/ProgressContext.js";
import { progressEmitter } from "../utils/commands.js";
export function WithConsole({ children, autoRefreshInterval, }) {
    useEffect(() => {
        consoleEmitter.on("console", (stream, message) => {
            if (stream === "warn" || stream === "error") {
                progressEmitter.log("console!", `${stream}: ${message}`);
            }
            else {
                progressEmitter.log("console", `${stream}: ${message}`);
            }
        });
        console.log("Console patch: %s %i", "DONE", 1);
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
//# sourceMappingURL=WithConsole.js.map