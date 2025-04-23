import React, { useReducer } from "react";
import { createContext } from "react";
export class ProgressContextType {
    state;
    dispatch;
    constructor(state, dispatch) {
        this.state = state;
        this.dispatch = dispatch;
    }
    update(path, state, status, details) {
        this.dispatch({
            type: "update",
            path,
            value: {
                state,
                status,
                details,
            },
        });
    }
    log(path, lines) {
        this.dispatch({
            type: "log",
            path,
            lines,
        });
    }
    logWithoutUpdate(path, lines) {
        if (!this.state.root[path]) {
            this.state.root[path] = {
                id: 0,
                log: [],
                status: "",
                state: "new",
            };
        }
        const log = this.state.root[path].log;
        this.state.root[path].log = [...log, ...lines];
    }
}
export const ProgressContext = createContext(null);
export const ProgressItemContext = createContext(undefined);
export function useProgress() {
    const context = React.useContext(ProgressContext);
    if (context === null) {
        throw new Error("useProgress must be used within a ProgressProvider");
    }
    return context;
}
export function createProgress(progressState) {
    return useReducer(progressReducer, progressState);
}
export function progressReducer(state, action) {
    //console.log("Progress reducer", action);
    const { root } = state;
    switch (action.type) {
        case "update":
            //console.log("Progress reducer update", action);
            return update(action);
        case "log":
            return log(action);
        case "refresh":
            return { ...state };
    }
    function log(action) {
        const { lines, path } = action;
        const item = root[path] ?? {
            state: "new",
            status: "",
            log: [],
            id: 0,
        };
        // avoid to much object copying and just push lines to existing log array
        item.log.push(...lines);
        root[path] = {
            ...item,
            id: item.id + 1,
        };
        return { root, id: state.id + 1 };
    }
    function update(action) {
        const { path, value } = action;
        const item = root[path] ?? {
            id: 0,
            state: "new",
            status: "",
            log: [""],
        };
        // creating a new object here means we cannot hold on to the ProgressItem value anywhere else in the code (i.e. when building status tree)
        root[path] = {
            ...item,
            ...value,
            id: item.id + 1,
        };
        return { root, id: state.id + 1 };
    }
}
//# sourceMappingURL=ProgressContext.js.map