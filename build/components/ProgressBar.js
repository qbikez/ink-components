import React from "react";
import { Box, Text } from "../tuir.js";
import figures from "figures";
export function ProgressBar({ value, style, width }) {
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
        showValue: style?.showValue ?? false,
    };
    return (React.createElement(Box, { flexGrow: 1, minWidth: 0 },
        complete > 0 && (React.createElement(Text, { color: "green" }, styles.completedCharacter.repeat(complete))),
        remaining > 0 && (React.createElement(Text, { color: "lightgrey" }, styles.remainingCharacter.repeat(remaining))),
        styles.showValue && (React.createElement(Text, null, ` ${progress}%`))));
}
//# sourceMappingURL=ProgressBar.js.map