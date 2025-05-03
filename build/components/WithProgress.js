import React, { useEffect } from "react";
import { createProgress, ProgressContextType, ProgressContext, } from "../utils/ProgressContext.js";
import { progressEmitter } from "../utils/commands.js";
export function WithProgress(props) {
    const progressState = {
        id: 0,
        root: {},
    };
    const [state, dispatchProgress] = createProgress(progressState);
    const progress = new ProgressContextType(state, dispatchProgress);
    useEffect(() => {
        progressEmitter.on('log', (path, message) => {
            progress.logWithoutUpdate(path, [message]);
        });
        progressEmitter.on('update', (path, state, status, details) => {
            progress.update(path, state, status, details);
        });
    }, []);
    return (React.createElement(ProgressContext.Provider, { value: progress }, props.children));
}
//# sourceMappingURL=WithProgress.js.map