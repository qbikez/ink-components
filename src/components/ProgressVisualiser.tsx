import React, { useEffect, useMemo, useRef, useState } from "react";

import { Box, KeyMap, List, Text, useKeymap, useList } from "../tuir.js";
import { ProgressItem } from "./Progress/progressItem.js";
import {
  Progress,
  ProgressWrapper,
} from "./Progress/Progress.js";
import { StatusNode } from "./StatusNode.js";
import { TreeNode, TreeView } from "./TreeView.js";
import { WithRenderCount } from "./WithRenderCount.js";

const VARIANTS = ["treeView", "listView"] as const;
export type ProgressVisualiserVariant = (typeof VARIANTS)[number];

export function ProgressVisualiser({
  progress,
  onItemSelected,
  variant = "listView",
}: {
  progress: Progress<string>;
  onItemSelected?: (item: string) => void;
  variant?: ProgressVisualiserVariant;
}): React.ReactNode {
  switch (variant) {
    case "listView":
      return RenderListView(progress, onItemSelected);
    case "treeView":
      return (
        <WithRenderCount>
          <RenderTreeView progress={progress} onItemSelected={onItemSelected} />
        </WithRenderCount>
      );
    default:
      throw new Error(`Unknown variant: ${variant}`);
  }
}

function RenderTreeView({
  progress,
  onItemSelected,
}: {
  progress: Progress<string>;
  onItemSelected?: (item: string) => void;
}) {
  const treeRef = useRef<TreeNode<ProgressItem>>();
  // const [tree, setTree] = useState<TreeNode<ProgressItem>>(
  //   buildTree(progress.state, "|"),
  // );
  const tree = useMemo(() => {
    console.log(
      `progress changed id=${progress.state.id} keys=${Object.keys(
        progress.state
      )}`
    );

    const updatedTree = buildTree(progress.state, "|", treeRef.current);
    return updatedTree;
    // we need to return a new object to trigger a re-render
    //  return { ...updatedTree };
    //});
  }, [progress]);
  treeRef.current = tree;

  return (
    <TreeView<ProgressItem>
      root={tree}
      onItemSelected={(item) => onItemSelected?.(item.fullName)}
      renderNode={(node) => (
        <Box>
          <StatusNode name={node.name} value={node.value}></StatusNode>
        </Box>
      )}
    />
  );
}

function RenderListView(
  progress: Progress<string>,
  onItemSelected: ((item: string) => void) | undefined
) {
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

function buildTree(
  progress: ProgressWrapper<string>,
  delimiter: "|",
  oldRoot?: TreeNode<ProgressItem>
): TreeNode<ProgressItem> {
  // we need old root to keep the state of the tree (i.e. collapsed/expanded)
  const newRoot: TreeNode<ProgressItem> = {
    name: `=== Progress ===`,
    fullName: "|",
    // we'll fill the cildren in a moment
    children: [],
    // we want to preserve collapsed state of the old root
    isCollapsed: oldRoot?.isCollapsed ?? false,
    // just a dummy value
  };

  const state = progress.root;

  for (const [stateKey, stateValue] of Object.entries(state)) {
    addNode(stateKey, stateValue!);
  }

  return newRoot;

  function addNode(stateKey: string, stateValue: ProgressItem) {
    let currentTreeNode = newRoot;
    let oldTreeNode = oldRoot;

    const parts = stateKey.split(delimiter);
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]!;
      const fullName = parts.slice(0, i + 1).join(delimiter);
      const isLeaf = i === parts.length - 1;
      const existingChild = currentTreeNode.children.find(
        (child) => child.name === part
      );
      const oldChild = oldTreeNode?.children?.find(
        (child) => child.name === part
      );
      oldTreeNode = oldChild;
      if (existingChild) {
        currentTreeNode = existingChild;
        if (isLeaf) currentTreeNode.value = stateValue;
      } else {
        const node: TreeNode<ProgressItem> = {
          name: part,
          fullName,
          children: [],
          value: isLeaf ? stateValue : undefined,
          isCollapsed: oldChild?.isCollapsed ?? false,
        };

        currentTreeNode.children.push(node);
        currentTreeNode = node;
      }
    }
  }
}
