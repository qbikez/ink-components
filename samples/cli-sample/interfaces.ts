import type { CommandEmitter, ProgressUpdate } from "./dependencies/ink-components.js";

export interface ProgressEmitter {
  log(path: string, message: string): void;

  update(path: string, value: ProgressUpdate): void;

  command(path: string, command: string, argsStr: string): void;
}

export type CliExport = {
  cli: (params: any) => void;
  commandEmitter: CommandEmitter;
  progressEmitter: ProgressEmitter;
};