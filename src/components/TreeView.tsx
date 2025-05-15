import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { Box, List, useList, Text, useListItem, KeyMap, useKeymap } from "tuir";
import { WithRenderCount } from "./WithRenderCount.js";

export type TreeNode<TItem = unknown> = {
  value?: TItem;
  name: string;
  fullName: string;
  children: TreeNode<TItem>[];
  isCollapsed?: boolean;
};

type FlattenedTreeNode<TItem = unknown> = {
  node: TreeNode<TItem>;
  level: number;
};

function flatten<T>(node: TreeNode<T>, level: number): FlattenedTreeNode<T>[] {
  const nodes: FlattenedTreeNode<T>[] = [{ node, level }];

  const { children, isCollapsed } = node;
  if (children && !isCollapsed) {
    for (const child of children) {
      nodes.push(...flatten(child, level + 1));
    }
  }

  return nodes;
}

export function TreeView<TItem = unknown>({
  root,
  onItemSelected,
  renderNode,
}: {
  root: TreeNode<TItem>;
  onItemSelected?: (item: TreeNode<TItem>) => void;
  renderNode: (node: TreeNode<TItem>) => React.ReactNode;
}) {
  const nodes = useMemo(() => {
    return flatten(root, 0);
  }, [root]);

  //console.log('render treeview');
  const { listView, items, setItems, control } = useList(nodes, {
    windowSize: "fit",
    unitSize: 1,
    navigation: "none",
    centerScroll: false,
    fallthrough: false,
  });

  useMemo(() => {
    //console.log("treeview root modified");
    setItems(flatten(root, 0));
  }, [root]);

  const keyMap = {
    upArrow: { key: "up" },
    downArrow: { key: "down" },
    leftArrow: { key: "left" },
    rightArrow: { key: "right" },
    enter: { key: "return" },
  } satisfies KeyMap;

  const { useEvent } = useKeymap(keyMap);

  //TODO: expose selected item
  useEvent("upArrow", () => {
    control.prevItem();
  });
  useEvent("downArrow", () => {
    control.nextItem();
  });
  useEvent("leftArrow", () => {
    const currentItem = items[control.currentIndex];
    const fullName = currentItem?.node.fullName;
    const splits = fullName?.split("|");
    if (splits && splits.length > 1) {
      const parentName = splits.slice(0, -1).join("|");
      const parentNode = nodes.find(
        (node) => node.node.fullName === parentName
      );
      if (parentNode) {
        const index = items.findIndex(
          (item) => item.node.fullName === parentName
        );
        control.goToIndex(index);
      }
    }
  });
  useEvent("enter", () => {
    const currentItem = items[control.currentIndex];
    if (currentItem) {
      const node = currentItem.node;
      if (node.children.length > 0) {
        node.isCollapsed = !node.isCollapsed;
        setItems(flatten(items[0]!.node, 0));
      }
    }
  });

  useEffect(() => {
    if (onItemSelected && control.currentIndex >= 0) {
      const item = items[control.currentIndex];
      if (!item) return;

      onItemSelected(item.node);
    }
  }, [items, control.currentIndex, onItemSelected]);

  return (
    <WithRenderCount>
      <List listView={listView}>
        {items.map((node) => (
          <ListItem node={node} key={node.node.name}>
            {renderNode(node.node)}
          </ListItem>
        ))}
      </List>
    </WithRenderCount>
  );
}
function ListItem({
  node,
  children,
}: PropsWithChildren & { node: FlattenedTreeNode }): React.JSX.Element {
  const { isFocus } = useListItem();
  const backgroundColor = isFocus ? "blue" : undefined;
  const textColor = "white";
  return (
    <Box backgroundColor={backgroundColor} width="100%">
      {node.node.isCollapsed && node.node.children ? (
        <Text color={"blue"}>{" ".repeat(node.level) + "└+ "}</Text>
      ) : (
        <Text color={"green"}>
          {" ".repeat(node.level)}
          {node.node.children ? "└  " : "└─ "}
        </Text>
      )}
      {children}
      {node.node.isCollapsed && node.node.children ? (
        <Text color={"gray"}> ({node.node.children.length})</Text>
      ) : (
        ""
      )}
    </Box>
  );
}
