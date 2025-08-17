import React, { useLayoutEffect } from "react";
import { createProgress } from "./Progress.js";
import { progressEmitter } from "../../utils/commands.js";
import { ProgressContext } from "./ProgressContext.js";
export function WithProgress(props) {
    const progress = createProgress();
    useLayoutEffect(() => {
        linkProgressToEmitter(progress);
    }, []);
    return (React.createElement(ProgressContext.Provider, { value: progress }, props.children));
}
function linkProgressToEmitter(progress) {
    progressEmitter.on("log", (path, message, mode) => {
        switch (mode) {
            case 'sync':
                progress.log(path, [message]);
                break;
            case 'async':
                progress.logWithoutUpdate(path, [message]);
                break;
            default:
                throw new Error(`Unknown log mode: ${mode}`);
        }
    });
    progressEmitter.on("update", (path, value) => {
        progress.update(path, value);
    });
    progressEmitter.on("setCommands", (path, commands) => {
        progress.setCommands(path, commands);
    });
}
//# sourceMappingURL=WithProgress.js.map