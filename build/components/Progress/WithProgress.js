import React, { useLayoutEffect } from "react";
import { createProgress } from "./ProgressReducer.js";
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
    progressEmitter.on("log", (path, message) => {
        // if there's a console.log call in a render path, it would cause log update, which will cause re-render, which will call console.log and cause infinite loop. To avoid that, we don't cause state change when logging from console, unless it's a console.log! call.
        let shouldUpdate = true;
        if (path == "console") {
            shouldUpdate = false;
        }
        if (path == "console!") {
            shouldUpdate = true;
            path = path.substring(0, path.length - 1);
        }
        if (shouldUpdate) {
            progress.log(path, [message]);
        }
        else {
            progress.logWithoutUpdate(path, [message]);
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