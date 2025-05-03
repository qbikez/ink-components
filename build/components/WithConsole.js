import React, { useEffect } from "react";
import { consoleEmitter } from "../utils/console-utils.js";
import { useProgress } from "../utils/ProgressContext.js";
import { progressEmitter } from "../utils/commands.js";
export function WithConsole({ children, autoRefreshInterval, }) {
    const progress = useProgress();
    useEffect(() => {
        consoleEmitter.on("console", (stream, message) => {
            // TODO: it's better to use progressEmitter, as it's the lower-level abstraction
            // but it always uses logWithoutUpdate. Find a way to hint about the stream type
            progressEmitter.emit("log", "console", `${stream}: ${message}`);
            // if (stream === "warn" || stream === "error") {
            //   progress.log("console", [`${stream}: ${message}`]);
            // } else {
            //   progress.logWithoutUpdate("console", [`${stream}: ${message}`]);
            // }
        });
        console.log("Console patch: %s %i", "DONE", 1);
    }, []);
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