import React from "react";
import { PropsWithChildren } from "react";
export declare function WithRenderCount({ children, autoRefreshInterval, mode, }: {
    autoRefreshInterval?: number;
    mode?: "inline" | "box";
} & PropsWithChildren): React.JSX.Element;
