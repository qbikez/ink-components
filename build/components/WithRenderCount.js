import React from "react";
import { Box } from "../tuir.js";
export function WithRenderCount({ children, autoRefreshInterval, }) {
    const renderCount = React.useRef(0);
    renderCount.current += 1;
    return (React.createElement(Box, { width: "100%", borderStyle: {
            top: "-",
            bottom: "-",
            left: "",
            right: "",
            topLeft: "",
            topRight: "",
            bottomLeft: "",
            bottomRight: "",
        }, borderBottom: false, borderLeft: false, borderRight: false, borderTop: true, borderColor: "gray", titleTopRight: { title: `Render count: ${renderCount.current}` } }, children));
}
//# sourceMappingURL=WithRenderCount.js.map