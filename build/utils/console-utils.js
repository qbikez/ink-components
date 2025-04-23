import { EventEmitter } from "node:events";
import { format } from "node:util";
const consoleMethods = [
    "assert",
    "count",
    "countReset",
    "debug",
    "dir",
    "dirxml",
    "error",
    "group",
    "groupCollapsed",
    "groupEnd",
    "info",
    "log",
    "table",
    "time",
    "timeEnd",
    "timeLog",
    "trace",
    "warn",
];
export const consoleEmitter = new EventEmitter();
export function patchConsole(callback) {
    callback ??= (stream, data) => {
        consoleEmitter.emit("console", stream, data);
    };
    for (const method of consoleMethods) {
        console[method] = (...data) => callback(method, format.apply(null, data));
    }
}
//# sourceMappingURL=console-utils.js.map