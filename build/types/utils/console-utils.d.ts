import { EventEmitter } from "node:events";
type Callback = (stream: string, data: string) => void;
export declare const consoleEmitter: EventEmitter;
export declare function patchConsole(callback?: Callback): void;
export {};
