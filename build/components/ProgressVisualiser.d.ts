import React from "react";
import { ProgressContextType } from "../utils/ProgressContext.js";
declare const VARIANTS: readonly ["treeView", "listView"];
export type ProgressVisualiserVariant = (typeof VARIANTS)[number];
export declare function ProgressVisualiser({ progress, onItemSelected, variant, }: {
    progress: ProgressContextType<string>;
    onItemSelected?: (item: string) => void;
    variant?: ProgressVisualiserVariant;
}): React.ReactNode;
export {};
