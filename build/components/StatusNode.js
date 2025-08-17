import React from "react";
import { Box, Text, useListItem } from "../tuir.js";
import { Spinner } from "./Spinner.js";
export function StatusNode({ name, value, }) {
    const { isFocus, isShallowFocus } = useListItem();
    const backgroundColor = isFocus
        ? "blue"
        : isShallowFocus
            ? "grey"
            : undefined;
    const foregroundColor = isFocus ? "white" : undefined;
    const { color, icon } = statusIcon(value ?? { state: "unknown" });
    return (React.createElement(Box, { backgroundColor: backgroundColor },
        value ? (value.state == "running" ? (React.createElement(Spinner, { label: " ", type: "dots", speed: 1 })) : (React.createElement(Box, { backgroundColor: backgroundColor, marginRight: 1 },
            React.createElement(Text, { color: color }, icon)))) : (React.createElement(React.Fragment, null)),
        React.createElement(Box, { backgroundColor: backgroundColor },
            React.createElement(Box, { backgroundColor: backgroundColor },
                React.createElement(Text, { color: foregroundColor }, `${name}`),
                value?.status || value?.details ? (React.createElement(Text, { color: foregroundColor },
                    ": ",
                    value?.status || "",
                    value?.details ? ` | ${value.details}` : "")) : (React.createElement(React.Fragment, null))))));
}
function statusIcon({ state }) {
    switch (state) {
        case "connected":
        case "running":
            return { color: "blue", icon: "Ϟ" };
        case "stopped":
        case "disconnected":
            return { color: "orange", icon: "■" };
        case "error":
            return { color: "red", icon: "⨉" };
        case "done":
            return { color: "green", icon: "✓" };
        case "pending":
            return { color: "yellow", icon: "◷" };
        default:
            return { color: "white", icon: `●[${state}]` };
    }
}
//# sourceMappingURL=StatusNode.js.map