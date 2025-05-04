import React, { useLayoutEffect } from "react";
import { createProgress, ProgressContextType, ProgressContext, } from "../utils/ProgressContext.js";
import { progressEmitter } from "../utils/commands.js";
export function WithProgress(props) {
    const progressState = {
        id: 0,
        root: {},
    };
    const [state, dispatchProgress] = createProgress(progressState);
    const progress = new ProgressContextType(state, dispatchProgress);
    useLayoutEffect(() => {
        linkProgressToProgress(progress);
    }, []);
    return (React.createElement(ProgressContext.Provider, { value: progress }, props.children));
}
function linkProgressToProgress(progress) {
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
    progressEmitter.on("update", (path, state, status, details) => {
        progress.update(path, state, status, details);
    });
}
//# sourceMappingURL=WithProgress.js.map