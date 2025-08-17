import React from "react";
import { Progress } from "./Progress/Progress.js";
declare const VARIANTS: readonly ["treeView", "listView"];
export type ProgressVisualiserVariant = (typeof VARIANTS)[number];
export declare function ProgressVisualiser({ progress, onItemSelected, variant, }: {
    progress: Progress<string>;
    onItemSelected?: (item: string) => void;
    variant?: ProgressVisualiserVariant;
}): React.ReactNode;
export {};
