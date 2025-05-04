import React from "react";
declare const VARIANTS: readonly ["simple", "master-detail"];
type RootVariant = (typeof VARIANTS)[number];
export declare function Root({ init, variant: initialVariant, }?: {
    init?: () => void;
    variant?: RootVariant;
}): React.JSX.Element;
export {};
