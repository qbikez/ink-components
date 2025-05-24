import React from "react";
import { Box, Text } from "../tuir.js";
import { useSpinner, type UseSpinnerProps } from "./useSpinner.js";
import { WithRenderCount } from "./WithRenderCount.js";
//import {useComponentTheme} from '../../theme.js';
//import {type Theme} from './theme.js';

export type SpinnerProps = UseSpinnerProps & {
  /**
   * Label to show near the spinner.
   */
  readonly label?: string;
};

export function Spinner({ label, type, speed }: SpinnerProps) {
  const { frame } = useSpinner({ type, speed });
  //const {styles} = useComponentTheme<Theme>('Spinner');

  return (
    <Box>
      <Text>{frame}</Text>
      {label && <Text>{label}</Text>}
    </Box>
  );
}
