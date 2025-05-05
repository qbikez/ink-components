import React from "react";
export type TreeNode<TItem = unknown> = {
    value?: TItem;
    name: string;
    fullName: string;
    children: TreeNode<TItem>[];
    isCollapsed?: boolean;
};
export declare function TreeView<TItem = unknown>({ root, onItemSelected, renderNode }: {
    root: TreeNode<TItem>;
    onItemSelected?: (item: TreeNode<TItem>) => void;
    renderNode: (node: TreeNode<TItem>) => React.ReactNode;
}): React.JSX.Element;
