import React, { useEffect, useMemo } from "react";
import { consoleEmitter } from "../utils/console-utils.js";
import { useProgress } from "../utils/ProgressContext.js";
export function WithConsole({ children, autoRefreshInterval, }) {
    const progress = useProgress();
    useMemo(() => {
        consoleEmitter.on("console", (stream, message) => {
            if (stream === "warn" || stream === "error") {
                progress.log("console", [`${stream}: ${message}`]);
            }
            else {
                progress.logWithoutUpdate("console", [`${stream}: ${message}`]);
            }
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