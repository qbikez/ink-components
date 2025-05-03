import { randomUUID } from "node:crypto";
import { EventEmitter } from "node:events";
class CommandEmitter extends EventEmitter {
    id;
    constructor() {
        super();
        this.id = randomUUID();
    }
    invokeCommand(command, path, args) {
        this.emit('invoke', command, path, args);
    }
}
export const commandEmitter = new CommandEmitter();
class ProgressEmitter extends EventEmitter {
    id;
    constructor() {
        super();
        this.id = randomUUID();
    }
    log(path, message) {
        this.emit("log", path, message);
    }
    update(path, state, status, details) {
        this.emit("update", path, state, status, details);
    }
    command(path, command, argsStr) {
        const args = JSON.parse(argsStr);
        this.emit("command", command, path, args);
    }
}
export const progressEmitter = new ProgressEmitter();
//# sourceMappingURL=commands.js.map