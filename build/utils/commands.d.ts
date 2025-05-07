import { UUID } from "node:crypto";
import { EventEmitter } from "node:events";
import { ProgressUpdate } from "./ProgressContext.js";
export interface CommandEmitter {
    on(event: "invoke", listener: (command: string, path: string, args: string[]) => void): this;
}
export declare class CommandEmitter extends EventEmitter {
    id: UUID;
    constructor();
    invokeCommand(command: string, path: string, args: string[]): void;
}
export type ProgressItemState = "new" | "pending" | "starting" | "running" | "stopped" | "done" | "error" | "connected" | "disconnected" | "unknown";
export interface ProgressEmitter {
    on(event: "log", listener: (path: string, message: string) => void): this;
    on(event: "update", listener: (path: string, value: Partial<ProgressUpdate>) => void): this;
    on(event: "command", listener: (command: string, path: string, args: string[]) => void): this;
}
export declare class ProgressEmitter extends EventEmitter {
    id: UUID;
    constructor();
    log(path: string, message: string): void;
    update(path: string, value: Partial<ProgressUpdate>): void;
    command(path: string, command: string, argsStr: string): void;
}
export declare const progressEmitter: ProgressEmitter;
export declare const commandEmitter: CommandEmitter;
