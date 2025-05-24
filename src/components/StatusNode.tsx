import React from "react";
import { Box, Text, useListItem, Color } from "../tuir.js";
import { Spinner } from "./Spinner.js";
import { ProgressBar } from "./ProgressBar.js";
import { ProgressItem, ProgressItemState } from "./Progress/progress.js";
import { WithRenderCount } from "./WithRenderCount.js";
import { GradientText } from "./GradientText.js";

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
          <Spinner label=" " type="dots" speed={1} />
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
          <GradientText 
            text={name}
            startColor={isFocus ? "#FFFFFF" : "#FF4500"}
            endColor={isFocus ? "#E0FFFF" : "#FFD700"}
          />
          {value?.status || value?.details ? (
            <Text color={foregroundColor}>
              : {value?.status || ""}
              {value?.details ? ` | ${value.details}` : ""}
            </Text>
          ) : (
            <></>
          )}
          {value?.progress ? (
            <ProgressBar
              value={value.progress}
              width={10}
              style={{ completedCharacter: "━", remainingCharacter: "━" }}
            ></ProgressBar>
          ) : (
            <></>
          )}
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
