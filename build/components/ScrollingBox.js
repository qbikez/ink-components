import React, { useState } from "react";
import { Box, useIsFocus, useKeymap, useResponsiveDimensions, } from "../tuir.js";
import cliBoxes from "cli-boxes";
import { border } from "../utils/borders.js";
import { GradientText } from "./GradientText.js";
import { WithRenderCount } from "./WithRenderCount.js";
export function ScrollingBox({ data = [], height = undefined, width = undefined, title = undefined, }) {
    //const [boxSize, setBoxSize] = useState({ width: 0, height: 0 });
    const [offset, setOffset] = useState(0);
    const dims = useResponsiveDimensions();
    const { ref: outputBox, height: boxHeight, width: boxWidth } = dims;
    const boxSize = {
        width: boxWidth ?? 0,
        height: boxHeight ?? 0,
    };
    const lineWidth = boxSize.width || 0 - 6 - 2;
    const pageSize = Math.floor(boxSize.height / 2);
    const textLines = boxSize.height - 2;
    const output = data.flatMap((s, idx) => s
        .split("\n")
        .flatMap((line) => wrapLine(line.replace("\r", ""), lineWidth, `[${idx}]`.padEnd(6))));
    const [state, dispatch] = React.useReducer((state, action) => {
        switch (action.type) {
            case "scroll":
                if (action.offset === 0)
                    return state;
                const moveBy = offset - state.offset;
                let newStartIdx = Math.max(0, (state.startIdx ?? output.length - textLines) + moveBy);
                if (newStartIdx + textLines > output.length) {
                    newStartIdx = undefined;
                }
                return {
                    ...state,
                    offset: action.offset,
                    startIdx: newStartIdx,
                    moveBy,
                };
            default:
                return state;
        }
    }, { startIdx: undefined, offset: 0 });
    const keyMap = {
        upArrow: { key: "up" },
        downArrow: { key: "down" },
    };
    const { useEvent } = useKeymap(keyMap);
    useEvent("upArrow", () => {
        setOffset((prev) => prev - pageSize);
    });
    useEvent("downArrow", () => {
        setOffset((prev) => prev + pageSize);
    });
    React.useEffect(() => {
        dispatch({ type: "scroll", offset });
    }, [offset]);
    const startIdx = state.startIdx ?? Math.max(0, output.length - textLines);
    const isAutoScroll = state.startIdx === undefined;
    const marker = isAutoScroll ? "↓" : "↑";
    const hasFocus = useIsFocus();
    return (React.createElement(WithRenderCount, { mode: "inline" },
        React.createElement(Box, { ref: outputBox, overflowY: "hidden", height: height, width: width, flexDirection: "column", flexGrow: 1 },
            React.createElement(Box, { borderColor: border(hasFocus).borderColor, borderStyle: {
                    ...cliBoxes.single,
                    bottomLeft: marker,
                }, titleBottomRight: {
                    title: `w:${boxSize.width} h:${boxSize.height}(${textLines}) data:${data.length}=>${output.length} start:${startIdx} offset:${offset}`,
                }, titleTopRight: { title: title ?? "" }, flexGrow: 1 },
                React.createElement(GradientText, null, output.slice(startIdx, startIdx + textLines).join("\n"))))));
}
function wrapLine(line, lineWidth, prefix) {
    prefix = prefix || "";
    const suffix = " ↲";
    const maxWidth = lineWidth - prefix.length - suffix.length;
    if (line.length <= maxWidth) {
        return [`${prefix}${line}`];
    }
    const wrappedLines = [];
    let currentLine = "";
    let start = 0;
    do {
        currentLine = line.slice(start, start + maxWidth);
        wrappedLines.push(`${prefix}${currentLine}${suffix}`);
        start += currentLine.length;
    } while (start < line.length && currentLine.length > 0);
    return wrappedLines;
}
//# sourceMappingURL=ScrollingBox.js.map