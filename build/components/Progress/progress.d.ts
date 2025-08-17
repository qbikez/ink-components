import React from "react";
import { CommandDescription, ProgressState, ProgressUpdate } from "./progressItem.js";
export type ProgressWrapper<TPath extends string | number | symbol> = {
    root: ProgressState<TPath>;
    id: number;
};
type UpdateAction<TPath extends string | number | symbol> = {
    type: "update";
    path: TPath;
    value: ProgressUpdate;
};
type LogAction<TPath extends string | number | symbol> = {
    type: "log";
    path: TPath;
    lines: string[];
};
type RefreshAction = {
    type: "refresh";
};
type SetCommandsAction<TPath extends string | number | symbol> = {
    type: "setCommands";
    path: TPath;
    commands: CommandDescription[];
};
export type ProgressAction<TPath extends string | number | symbol> = UpdateAction<TPath> | LogAction<TPath> | RefreshAction | SetCommandsAction<TPath>;
export declare class Progress<TPath extends string | number | symbol> {
    state: ProgressWrapper<TPath>;
    private dispatch;
    constructor(state: ProgressWrapper<TPath>, dispatch: React.Dispatch<ProgressAction<TPath>>);
    update(path: TPath, value: ProgressUpdate): void;
    log(path: TPath, lines: string[]): void;
    logWithoutUpdate(path: TPath, lines: string[]): void;
    setCommands(path: TPath, commands: CommandDescription[]): void;
    refresh(): void;
    static reducer<TPath extends string | number | symbol>(state: ProgressWrapper<TPath>, action: ProgressAction<TPath>): ProgressWrapper<TPath>;
}
export declare function createProgress<TPath extends string | number | symbol>(initialState?: ProgressWrapper<TPath>): Progress<string | number | symbol>;
export {};
