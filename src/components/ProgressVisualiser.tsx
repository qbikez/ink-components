import React, { useEffect, useMemo } from "react";

import { Box, KeyMap, List, Text, useKeymap, useList, useListItem } from "../tuir.js";
import {
  ProgressContextType,
} from "../utils/ProgressContext.js";
import { StatusNode } from "./StatusNode.js";

export function ProgressVisualiser({
  progress,
  onItemSelected,
}: {
  progress: ProgressContextType<string>;
  onItemSelected?: (item: string) => void;
}): React.ReactNode {
  const states = useMemo(
    () => Object.entries(progress.state.root),
    [progress.state]
  );

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
  } satisfies KeyMap;

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
      if (!item) return;

      const key = item[0];
      onItemSelected(key);
    }
  }, [items, control.currentIndex, onItemSelected]);

  useEffect(() => {
    setItems(states);
  }, [states]);

  const currentIndex = control.currentIndex;
  const currentItem = items[currentIndex];

  return (
    <List listView={listView}>
      {items.map(([key, value]) => {
        return <StatusNode key={key} name={key} value={value}></StatusNode>;
      })}
    </List>
  );
}

function Item(): React.ReactNode {
  const { isFocus, item } = useListItem<string[]>();
  const color = isFocus ? "blue" : undefined;
  return (
    <Box width="100" backgroundColor={color}>
      <Text wrap="truncate-end">{item}</Text>
    </Box>
  );
}

