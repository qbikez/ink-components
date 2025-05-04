import React, { useState } from "react";
import { Box, type DOMElement, Text, measureElement } from "../tuir.js";
import figures from "figures";
//import {useComponentTheme} from '../../theme.js';
//import {type Theme} from './theme.js';

export type ProgressBarProps = {
  /**
   * Progress.
   * Must be between 0 and 100.
   *
   * @default 0
   */
  readonly value: number;
  width: number;
  style?: {
    completedCharacter?: string;

    // Character for rendering a remaining bar
    remainingCharacter?: string;
    showValue?: boolean;
  };
};

export function ProgressBar({ value, style, width }: ProgressBarProps) {
//   const [width, setWidth] = useState(0);

//   // eslint-disable-next-line @typescript-eslint/ban-types
//   const [ref, setRef] = useState<DOMElement | null>(null);

//   if (ref) {
//     const dimensions = measureElement(ref);

//     if (dimensions.width !== width) {
//       setWidth(dimensions.width);
//     }
//   }



  const progress = Math.min(100, Math.max(0, value));
  const complete = Math.round((progress / 100) * width);
  const remaining = width - complete;

  const styles = {
    completedCharacter: style?.completedCharacter ?? figures.square,
    remainingCharacter: style?.remainingCharacter ?? figures.squareLightShade,
    showValue : style?.showValue ?? false,
  };

  return (
    <Box flexGrow={1} minWidth={0}>
      {complete > 0 && (
        <Text color={"green"}>
          {styles.completedCharacter.repeat(complete)}
        </Text>
      )}

      {remaining > 0 && (
        <Text color={"lightgrey"}>
          {styles.remainingCharacter.repeat(remaining)}
        </Text>
      )}

      {styles.showValue && (
        <Text>
          {` ${progress}%`}
        </Text>
      )}
    </Box>
  );
}
