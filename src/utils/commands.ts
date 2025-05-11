import { randomUUID, UUID } from "node:crypto";
import { EventEmitter } from "node:events";
import { ProgressUpdate } from "../components/Progress/progress.js";

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



export interface ProgressEmitter {
  on(event: "log", listener: (path: string, message: string) => void): this;
  on(
    event: "update",
    listener: (
      path: string,
      value: Partial<ProgressUpdate>
    ) => void
  ): this;
  on(
    event: "command",
    listener: (command: string, path: string, args: string[]) => void
  ): this;
}

export class ProgressEmitter extends EventEmitter {
  public id: UUID;
  constructor() {
    super();
    this.id = randomUUID();
  }

  log(path: string, message: string): void {
    this.emit("log", path, message);
  }

  update(
    path: string,
    value: Partial<ProgressUpdate>
  ): void {
    this.emit("update", path, value);
  }

  command(path: string, command: string, argsStr: string): void {
    const args = JSON.parse(argsStr) as string[];
    this.emit("command", command, path, args);
  }
}

export const progressEmitter: ProgressEmitter = new ProgressEmitter();
export const commandEmitter: CommandEmitter = new CommandEmitter();