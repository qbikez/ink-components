import React, { useEffect, useState } from "react";
import {
  Box,
  KeyMap,
  measureElement,
  Text,
  useIsFocus,
  useKeymap,
  DOMElement,
  usePage,
} from "../tuir.js";
import cliBoxes from "cli-boxes";
import { border } from "../utils/borders.js";

type State = {
  startIdx?: number;
  offset: number;
};
type Action = { type: "scroll"; offset: number };

export default function ScrollingBox({
  lines = 5,
  data = [],
  height = undefined,
  width = undefined,
  title = undefined,
}: {
  lines?: number;
  data: string[];
  height?: string | number;
  width?: string | number;
  title?: string;
}) {
  const [textLines, setTextLines] = useState<number>(lines);
  const [boxSize, setBoxSize] = useState({ width: 0, height: 0 });
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(0);

  const lineWidth = boxSize.width - 6 - 2;

  const output = data.flatMap((s, idx) =>
    s.split("\n").flatMap((line) => wrapLine(line.replace("\r", ""), lineWidth, `[${idx}]`.padEnd(6)))
  );

  const [state, dispatch] = React.useReducer(
    (state: State, action: Action) => {
      switch (action.type) {
        case "scroll":
          if (action.offset === 0) return state;
          const moveBy = offset - state.offset;
          let newStartIdx: number | undefined = Math.max(
            0,
            (state.startIdx ?? output.length - textLines) + moveBy
          );
          if (newStartIdx + textLines > output.length) {
            newStartIdx = undefined;
          }

          return {
            ...state,
            offset: action.offset,
            startIdx: newStartIdx,
            moveBy,
          };

        default:
          return state;
      }
    },
    { startIdx: undefined, offset: 0 }
  );

  const keyMap = {
    upArrow: { key: "up" },
    downArrow: { key: "down" },
  } satisfies KeyMap;

  const { useEvent } = useKeymap(keyMap);

  useEvent("upArrow", () => {
    setOffset((prev) => prev - pageSize);
  });

  useEvent("downArrow", () => {
    setOffset((prev) => prev + pageSize);
  });

  React.useEffect(() => {
    dispatch({ type: "scroll", offset });
  }, [offset]);

  const outputBox = React.useRef<DOMElement>(null);
  const startIdx = state.startIdx ?? Math.max(0, output.length - textLines);
  const isAutoScroll = state.startIdx === undefined;
  const marker = isAutoScroll ? "↓" : "↑";

  const hasFocus = useIsFocus();
  //const { isShallowFocus, isFocus: pageFocus } = usePage();
  // TODO: find a better way to get the size of the box
  // without using a ref or without running each time
  useEffect(() => {
    if (!outputBox.current) return;
    const size = measureElement(outputBox.current);
    setBoxSize(size);
    setTextLines(size.height - 2);
  }, [hasFocus/*, isShallowFocus, pageFocus*/]);

  useEffect(() => {
    const newPageSize = Math.floor(boxSize.height / 2);
    setPageSize(newPageSize);
  }, [boxSize]);

  return (
    <>
      <Box
        ref={outputBox}
        overflowY="hidden"
        height={height}
        width={width}
        flexDirection="column"
        flexGrow={1}
      >
        <Box
          borderColor={border(hasFocus).borderColor}
          borderStyle={{
            ...cliBoxes.single,
            bottomLeft: marker,
          }}
          titleBottomRight={{
            title: `w:${boxSize.width} h:${boxSize.height}(${textLines}) data:${data.length}=>${output.length} start:${startIdx} offset:${offset}`,
          }}
          titleTopRight={{ title: title ?? "" }}
          flexGrow={1}
          // height="100%"
        >
          <Text>{output.slice(startIdx, startIdx + textLines).join("\n")}</Text>
        </Box>
        {/* <Box marginLeft={6} marginTop={-1}>
          <Text>
            w:{boxSize.width} h:{boxSize.height} o:{output.length} l:{textLines}
          </Text>
        </Box> */}
      </Box>
    </>
  );
}


function wrapLine(line: string, lineWidth: number, prefix?: string): string[] {
  prefix = prefix || "";
  const suffix = " ↲";
  const maxWidth = lineWidth - prefix.length - suffix.length;
  if (line.length <= maxWidth) {
    return [`${prefix}${line}`];
  }

  const wrappedLines = [];
  let currentLine = "";
  let start = 0;

  do {
    currentLine = line.slice(start, start + maxWidth);
    wrappedLines.push(`${prefix}${currentLine}${suffix}`);
    start += currentLine.length;
  } while (start < line.length && currentLine.length > 0);

  return wrappedLines;
}
