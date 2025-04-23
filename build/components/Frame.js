import React from "react";
import { Box, useNode } from "../tuir.js";
import { border } from "../utils/borders.js";
export function Frame(props) {
    const { isFocus, name } = useNode();
    return (React.createElement(Box, { ...props, borderColor: border(isFocus).borderColor }, props.children));
}
//# sourceMappingURL=Frame.js.map