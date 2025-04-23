import { EventEmitter } from "node:events";
declare interface CommandEmitter {
    on(event: 'invoke', listener: (command: string, path: string, args: string[]) => void): this;
}
declare class CommandEmitter extends EventEmitter {
    invokeCommand(command: string, path: string, args: string[]): void;
}
export declare const commandEmitter: CommandEmitter;
export type ProgressItemState = "new" | "pending" | "starting" | "running" | "stopped" | "done" | "error" | "connected" | "disconnected" | "unknown";
declare interface ProgressEmitter {
    on(event: "log", listener: (path: string, message: string) => void): this;
    on(event: "update", listener: (path: string, state: ProgressItemState, status?: string, details?: string) => void): this;
}
declare class ProgressEmitter extends EventEmitter {
    log(path: string, message: string): void;
    update(path: string, state: ProgressItemState, status?: string, details?: string): void;
}
export declare const progressEmitter: ProgressEmitter;
export {};
