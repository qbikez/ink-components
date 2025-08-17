import { randomUUID, UUID } from "node:crypto";
import { EventEmitter } from "node:events";
import {
  CommandDescription,
  ProgressUpdate,
} from "../components/Progress/progressItem.js";

export interface CommandEmitter {
  on(
    event: "invoke",
    listener: (command: string, path: string, args: string[]) => void
  ): this;
}

export class CommandEmitter extends EventEmitter {
  public id: UUID;
  constructor() {
    super();
    this.id = randomUUID();
  }

  invokeCommand(command: string, path: string, args: string[]): void {
    this.emit("invoke", command, path, args);
  }
}

export interface IProgressEmitter {
  log(path: string, message: string): void;
  update(path: string, value: ProgressUpdate): void;
  command(path: string, command: string, argsStr: string): void;
  setCommands(path: string, commands: string): void;
}

export interface ProgressEmitter {
  on(event: "log", listener: (path: string, message: string, mode: UpdateMode) => void): this;
  on(
    event: "update",
    listener: (path: string, value: ProgressUpdate) => void
  ): this;
  on(
    event: "command",
    listener: (command: string, path: string, args: string[]) => void
  ): this;
  on(
    event: "setCommands",
    listener: (path: string, commands: CommandDescription[]) => void
  ): this;
}
export type UpdateMode = 'async' | 'sync';
export class ProgressEmitter extends EventEmitter implements IProgressEmitter {
  public id: UUID;
  constructor() {
    super();
    this.id = randomUUID();
  }

  log(path: string, message: string, mode: UpdateMode = 'sync'): void {
    this.emit("log", path, message, mode);
  }

  update(path: string, value: ProgressUpdate): void {
    this.emit("update", path, value);
  }

  command(path: string, command: string, argsStr: string): void {
    const args = JSON.parse(argsStr) as string[];
    this.emit("command", command, path, args);
  }

  setCommands(path: string, commands: string): void {
    const args = JSON.parse(commands) as CommandDescription[];
    this.emit("setCommands", path, args);
  }
}

export const progressEmitter: ProgressEmitter = new ProgressEmitter();
export const commandEmitter: CommandEmitter = new CommandEmitter();
