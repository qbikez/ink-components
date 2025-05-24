import React from "react";
import { PropsWithChildren } from "react";
import { Box, Text } from "../tuir.js";

export function WithRenderCount({
  children,
  autoRefreshInterval,
  mode = 'box',
}: {
  autoRefreshInterval?: number;
  mode?: "inline" | "box";
} & PropsWithChildren) {
  const renderCount = React.useRef(0);
  renderCount.current += 1;

  return (
    <Box
      //width="100%"
      // borderStyle={{
      //   top: "-",
      //   bottom: "-",
      //   left: "",
      //   right: "",
      //   topLeft: "",
      //   topRight: "",
      //   bottomLeft: "",
      //   bottomRight: "",
      // }}
      // borderBottom={false}
      // borderLeft={false}
      // borderRight={false}
      // borderTop={true}
      // borderColor={"gray"}
      titleTopRight={{ title: `R:${renderCount.current}` }}
      flexDirection="row"
      flexGrow={10}
    >
      {children}
      {mode == "inline" ? <Text>[{renderCount.current}]</Text> : null}
    </Box>
  );
}
