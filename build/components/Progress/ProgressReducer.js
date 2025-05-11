import { useReducer } from "react";
import { createProgressItem, } from "./progress.js";
export class ProgressReducer {
    state;
    dispatch;
    constructor(state, dispatch) {
        this.state = state;
        this.dispatch = dispatch;
    }
    update(path, value) {
        this.dispatch({
            type: "update",
            path,
            value,
        });
    }
    log(path, lines) {
        this.dispatch({
            type: "log",
            path,
            lines,
        });
    }
    setCommands(path, commands) {
        this.dispatch({
            type: "setCommands",
            path,
            commands,
        });
    }
    logWithoutUpdate(path, lines) {
        this.state.root[path] ??= createProgressItem();
        const log = this.state.root[path].log;
        this.state.root[path].log = [...log, ...lines];
    }
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
        case "setCommands":
            return setCommands(action);
        case "refresh":
            return { ...state };
    }
    function log(action) {
        const { lines, path } = action;
        const item = root[path] ?? createProgressItem();
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
        const item = root[path] ?? createProgressItem();
        // creating a new object here means we cannot hold on to the ProgressItem value anywhere else in the code (i.e. when building status tree)
        root[path] = {
            ...item,
            ...value,
            id: item.id + 1,
        };
        return { root, id: state.id + 1 };
    }
    function setCommands(action) {
        const { path, commands } = action;
        const item = root[path] ?? createProgressItem();
        item.commands = commands;
        root[path] = {
            ...item,
            commands,
            id: item.id + 1,
        };
        return { root, id: state.id + 1 };
    }
}
export function createProgress(initialState) {
    initialState ??= {
        id: 0,
        root: {},
    };
    const [state, dispatch] = useReducer(progressReducer, initialState);
    const progress = new ProgressReducer(state, dispatch);
    return progress;
}
//# sourceMappingURL=ProgressReducer.js.map