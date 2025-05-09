import React, { useEffect, useState } from "react";
import {
  Box,
  Cli,
  Commands,
  KeyMap,
  Node,
  useKeymap,
  useNodeMap,
} from "../dependencies/tuir.js";
import {
  useProgress,
  ProgressVisualiser,
  Frame,
  ScrollingBox,
  commandEmitter,
  ProgressVisualiserVariant,
} from "../dependencies/ink-components.js";
import cliBoxes from "cli-boxes";

export function MasterDetail({
  variant,
}: {
  variant: ProgressVisualiserVariant;
}) {
  const progress = useProgress();

  const nodeMap = [["list"], ["log"]];
  const { register, control } = useNodeMap(nodeMap, { navigation: "none" });
  const [selectedItem, setSelectedItem] = useState<string>("console");

  const selectedProgress = progress.state.root[selectedItem];

  const keyMap = {
    quit: { input: "q" },
    start: { input: "s" },
    tab: { key: "tab" },
  } satisfies KeyMap;
  const { useEvent } = useKeymap(keyMap);

  useEvent("quit", () => {
    process.exit(0);
  });
  useEvent("start", () => {
    commandEmitter.invokeCommand("start", selectedItem, []);
  });
  useEvent("tab", () => {
    control.next();
  });

  const commands = {
    q: async (args) => {
      process.exit(0);
    },
    DEFAULT: async (args) => {
      console.warn("Command invoked!", args);
    },
  } satisfies Commands;

  return (
    <Box flexDirection="column">
      <Node {...register("list")}>
        <Frame height={10} borderStyle={{ ...cliBoxes.doubleSingle }}>
          <ProgressVisualiser
            progress={progress}
            onItemSelected={(i) => setSelectedItem(i)}
            variant={variant}
          ></ProgressVisualiser>
        </Frame>
      </Node>
      <Node {...register("log")}>
        <Frame flexGrow={1}>
          <ScrollingBox
            data={selectedProgress?.log ?? []}
            width={"100%"}
            title={selectedItem ?? "??"}
          ></ScrollingBox>
        </Frame>
      </Node>
      <Cli commands={commands}></Cli>
    </Box>
  );
}
