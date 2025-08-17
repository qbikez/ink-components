import React from "react";
import { type UseSpinnerProps } from "./useSpinner.js";
export type SpinnerProps = UseSpinnerProps & {
    /**
     * Label to show near the spinner.
     */
    readonly label?: string;
};
export declare function Spinner({ label, type, speed }: SpinnerProps): React.JSX.Element;
