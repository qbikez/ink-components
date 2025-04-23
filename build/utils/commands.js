import { EventEmitter } from "node:events";
class CommandEmitter extends EventEmitter {
    invokeCommand(command, path, args) {
        this.emit('invoke', command, path, args);
    }
}
export const commandEmitter = new CommandEmitter();
class ProgressEmitter extends EventEmitter {
    log(path, message) {
        this.emit("log", path, message);
    }
    update(path, state, status, details) {
        this.emit("update", path, state, status, details);
    }
}
export const progressEmitter = new ProgressEmitter();
//# sourceMappingURL=commands.js.map