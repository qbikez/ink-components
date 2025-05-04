import React from "react";
export type ProgressBarProps = {
    /**
     * Progress.
     * Must be between 0 and 100.
     *
     * @default 0
     */
    readonly value: number;
    width: number;
    style?: {
        completedCharacter?: string;
        remainingCharacter?: string;
        showValue?: boolean;
    };
};
export declare function ProgressBar({ value, style, width }: ProgressBarProps): React.JSX.Element;
