import React from "react";
import { ProgressItemState } from "./commands.js";
export type ProgressPath = "main|signalR" | "server" | "client" | "main" | "main|stdin" | "console";
export type ProgressUpdate = {
    state: ProgressItemState;
    status: string;
    details?: string;
    progress?: number;
};
export type ProgressItem = {
    id: number;
    log: string[];
} & ProgressUpdate;
export type Progress<TPath extends string | number | symbol> = {
    [key in TPath]?: ProgressItem;
};
export type ProgressContextState<TPath extends string | number | symbol> = {
    root: Progress<TPath>;
    id: number;
};
type UpdateAction<TPath extends string | number | symbol> = {
    type: "update";
    path: TPath;
    value: Partial<ProgressUpdate>;
};
type LogAction<TPath extends string | number | symbol> = {
    type: "log";
    path: TPath;
    lines: string[];
};
type RefreshAction = {
    type: "refresh";
};
export type ProgressAction<TPath extends string | number | symbol> = UpdateAction<TPath> | LogAction<TPath> | RefreshAction;
export declare class ProgressContextType<TPath extends string | number | symbol> {
    state: ProgressContextState<TPath>;
    dispatch: React.Dispatch<ProgressAction<TPath>>;
    constructor(state: ProgressContextState<TPath>, dispatch: React.Dispatch<ProgressAction<TPath>>);
    update(path: TPath, value: Partial<ProgressUpdate>): void;
    log(path: TPath, lines: string[]): void;
    logWithoutUpdate(path: TPath, lines: string[]): void;
}
export declare const ProgressContext: React.Context<ProgressContextType<string>>;
export declare const ProgressItemContext: React.Context<ProgressItem | undefined>;
export declare function useProgress(): ProgressContextType<string>;
export declare function createProgress<TPath extends string | number | symbol>(progressState: ProgressContextState<TPath>): [ProgressContextState<string | number | symbol>, React.Dispatch<ProgressAction<string | number | symbol>>];
export declare function progressReducer<TPath extends string | number | symbol>(state: ProgressContextState<TPath>, action: ProgressAction<TPath>): ProgressContextState<TPath>;
export {};
