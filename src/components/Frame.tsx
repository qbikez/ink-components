import React, { PropsWithChildren } from "react";

import { Box, BoxProps, useNode } from "../tuir.js";
import { border } from "../utils/borders.js";

export function Frame(props: BoxProps & PropsWithChildren): React.ReactNode {
  const { isFocus, name } = useNode();

  return (
    <Box {...props} borderColor={border(isFocus).borderColor}>
      {props.children}
    </Box>
  );
}
