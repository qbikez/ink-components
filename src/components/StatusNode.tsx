import React from "react";
import { Box, Text, useListItem, Color } from "../tuir.js";
import { ProgressItem } from "../utils/ProgressContext.js";
import { ProgressItemState } from "../utils/commands.js";
import { Spinner } from "./Spinner.js";

export function StatusNode({
  name,
  value,
}: {
  name: string;
  value?: ProgressItem;
}): React.JSX.Element {
  const { isFocus, isShallowFocus } = useListItem();
  const backgroundColor = isFocus
    ? "blue"
    : isShallowFocus
    ? "grey"
    : undefined;
  const foregroundColor = isFocus ? "white" : undefined;
  const { color, icon } = statusIcon(value ?? { state: "unknown" });
  return (
    <Box backgroundColor={backgroundColor}>
      {value ? (
        value.state == "running" ? (
          <Spinner label=" " type="dots" speed={2} />
        ) : (
          <Box backgroundColor={backgroundColor} marginRight={1}>
            <Text color={color}>{icon}</Text>
          </Box>
        )
      ) : (
        <></>
      )}
      <Box backgroundColor={backgroundColor}>
        <Box backgroundColor={backgroundColor}>
          <Text color={foregroundColor}>{`${name}`}</Text>
          {value?.status || value?.details ? (
            <Text color={foregroundColor}>
              : {value?.status || ""}
              {value?.details ? ` | ${value.details}` : ""}
            </Text>
          ) : (
            <></>
          )}
          <Text color={foregroundColor}>
            | {value?.progress}%
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

function statusIcon({ state }: { state: ProgressItemState }): {
  color: Color;
  icon: string;
} {
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
