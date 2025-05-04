import React, { useEffect, useMemo } from "react";
import { Box, List, Text, useKeymap, useList, useListItem } from "../tuir.js";
import { StatusNode } from "./StatusNode.js";
export function ProgressVisualiser({ progress, onItemSelected, }) {
    const states = useMemo(() => Object.entries(progress.state.root), [progress.state]);
    const { listView, items, setItems, control } = useList(states, {
        windowSize: "fit",
        unitSize: 1,
        navigation: "none",
        centerScroll: false,
        fallthrough: false,
    });
    const keyMap = {
        upArrow: { key: "up" },
        downArrow: { key: "down" },
    };
    const { useEvent } = useKeymap(keyMap);
    useEvent("upArrow", () => {
        control.prevItem();
    });
    useEvent("downArrow", () => {
        control.nextItem();
    });
    useEffect(() => {
        if (onItemSelected && control.currentIndex >= 0) {
            const item = items[control.currentIndex];
            if (!item)
                return;
            const key = item[0];
            onItemSelected(key);
        }
    }, [items, control.currentIndex, onItemSelected]);
    useEffect(() => {
        setItems(states);
    }, [states]);
    const currentIndex = control.currentIndex;
    const currentItem = items[currentIndex];
    return (React.createElement(List, { listView: listView }, items.map(([key, value]) => {
        return React.createElement(StatusNode, { key: key, name: key, value: value });
    })));
}
function Item() {
    const { isFocus, item } = useListItem();
    const color = isFocus ? "blue" : undefined;
    return (React.createElement(Box, { width: "100", backgroundColor: color },
        React.createElement(Text, { wrap: "truncate-end" }, item)));
}
//# sourceMappingURL=ProgressVisualiser.js.map