import React, { useEffect, useState } from "react";
import { Box, measureElement, Text, useIsFocus, useKeymap, } from "../tuir.js";
import cliBoxes from "cli-boxes";
import { border } from "../utils/borders.js";
export function ScrollingBox({ lines = 5, data = [], height = undefined, width = undefined, title = undefined, }) {
    const [textLines, setTextLines] = useState(lines);
    const [boxSize, setBoxSize] = useState({ width: 0, height: 0 });
    const [offset, setOffset] = useState(0);
    const [pageSize, setPageSize] = useState(0);
    const lineWidth = boxSize.width - 6 - 2;
    const output = data.flatMap((s, idx) => s.split("\n").flatMap((line) => wrapLine(line.replace("\r", ""), lineWidth, `[${idx}]`.padEnd(6))));
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
    const outputBox = React.useRef(null);
    const startIdx = state.startIdx ?? Math.max(0, output.length - textLines);
    const isAutoScroll = state.startIdx === undefined;
    const marker = isAutoScroll ? "↓" : "↑";
    const hasFocus = useIsFocus();
    //const { isShallowFocus, isFocus: pageFocus } = usePage();
    // TODO: find a better way to get the size of the box
    // without using a ref or without running each time
    useEffect(() => {
        if (!outputBox.current)
            return;
        const size = measureElement(outputBox.current);
        setBoxSize(size);
        setTextLines(size.height - 2);
    }, [hasFocus /*, isShallowFocus, pageFocus*/]);
    useEffect(() => {
        const newPageSize = Math.floor(boxSize.height / 2);
        setPageSize(newPageSize);
    }, [boxSize]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { ref: outputBox, overflowY: "hidden", height: height, width: width, flexDirection: "column", flexGrow: 1 },
            React.createElement(Box, { borderColor: border(hasFocus).borderColor, borderStyle: {
                    ...cliBoxes.single,
                    bottomLeft: marker,
                }, titleBottomRight: {
                    title: `w:${boxSize.width} h:${boxSize.height}(${textLines}) data:${data.length}=>${output.length} start:${startIdx} offset:${offset}`,
                }, titleTopRight: { title: title ?? "" }, flexGrow: 1 },
                React.createElement(Text, null, output.slice(startIdx, startIdx + textLines).join("\n"))))));
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