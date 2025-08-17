import { UUID } from "node:crypto";
import { EventEmitter } from "node:events";
import { CommandDescription, ProgressUpdate } from "../components/Progress/progressItem.js";
export interface CommandEmitter {
    on(event: "invoke", listener: (command: string, path: string, args: string[]) => void): this;
}
export declare class CommandEmitter extends EventEmitter {
    id: UUID;
    constructor();
    invokeCommand(command: string, path: string, args: string[]): void;
}
export interface IProgressEmitter {
    log(path: string, message: string): void;
    update(path: string, value: ProgressUpdate): void;
    command(path: string, command: string, argsStr: string): void;
    setCommands(path: string, commands: string): void;
}
export interface ProgressEmitter {
    on(event: "log", listener: (path: string, message: string, mode: UpdateMode) => void): this;
    on(event: "update", listener: (path: string, value: ProgressUpdate) => void): this;
    on(event: "command", listener: (command: string, path: string, args: string[]) => void): this;
    on(event: "setCommands", listener: (path: string, commands: CommandDescription[]) => void): this;
}
export type UpdateMode = 'async' | 'sync';
export declare class ProgressEmitter extends EventEmitter implements IProgressEmitter {
    id: UUID;
    constructor();
    log(path: string, message: string, mode?: UpdateMode): void;
    update(path: string, value: ProgressUpdate): void;
    command(path: string, command: string, argsStr: string): void;
    setCommands(path: string, commands: string): void;
}
export declare const progressEmitter: ProgressEmitter;
export declare const commandEmitter: CommandEmitter;
