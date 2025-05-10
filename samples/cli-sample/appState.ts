import { ProgressUpdate } from "./interfaces.js";

export type CommandDescription = {
    name: string;
    description: string;
    key: string;
}

export type AppItem = {
    id: string;
    name: string;
    log: string[];
    commands: CommandDescription[];
} & ProgressUpdate;

export type Appstate = {
    items: Record<string, AppItem>;
}