import React from "react";
import { Box, Text } from "../tuir.js";
export function PageIndicator({ pageNames, currentPage, }) {
    return (React.createElement(Box, { height: 1, justifyContent: "center" }, pageNames.map((name, idx) => (React.createElement(Text, { key: idx, color: idx === currentPage ? "blue" : "white" },
        idx + 1,
        ": ",
        name,
        " |",
        " ")))));
}
//# sourceMappingURL=PageIndicator.js.map