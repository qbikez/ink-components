import React from "react";
import { ProgressContextType } from "../utils/ProgressContext.js";
export declare function ProgressVisualiser({ progress, onItemSelected, }: {
    progress: ProgressContextType<string>;
    onItemSelected?: (item: string) => void;
}): React.ReactNode;
