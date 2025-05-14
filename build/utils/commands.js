import { randomUUID } from "node:crypto";
import { EventEmitter } from "node:events";
export class CommandEmitter extends EventEmitter {
    id;
    constructor() {
        super();
        this.id = randomUUID();
    }
    invokeCommand(command, path, args) {
        this.emit("invoke", command, path, args);
    }
}
export class ProgressEmitter extends EventEmitter {
    id;
    constructor() {
        super();
        this.id = randomUUID();
    }
    log(path, message) {
        this.emit("log", path, message);
    }
    update(path, value) {
        this.emit("update", path, value);
    }
    command(path, command, argsStr) {
        const args = JSON.parse(argsStr);
        this.emit("command", command, path, args);
    }
    setCommands(path, commands) {
        const args = JSON.parse(commands);
        this.emit("setCommands", path, args);
    }
}
export const progressEmitter = new ProgressEmitter();
export const commandEmitter = new CommandEmitter();
//# sourceMappingURL=commands.js.map