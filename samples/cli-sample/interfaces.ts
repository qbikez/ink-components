import { type CommandEmitter, type ProgressEmitter } from "./dependencies/ink-components";

export type CliExport = {
    cli: (params: any) => void;
    commandEmitter: CommandEmitter;
    progressEmitter: ProgressEmitter;
}