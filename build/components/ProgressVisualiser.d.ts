import React from "react";
import { ProgressReducer } from "./Progress/ProgressReducer.js";
declare const VARIANTS: readonly ["treeView", "listView"];
export type ProgressVisualiserVariant = (typeof VARIANTS)[number];
export declare function ProgressVisualiser({ progress, onItemSelected, variant, }: {
    progress: ProgressReducer<string>;
    onItemSelected?: (item: string) => void;
    variant?: ProgressVisualiserVariant;
}): React.ReactNode;
export {};
