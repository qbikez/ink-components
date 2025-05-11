import React, { useEffect, useState } from "react";
import {
  Box,
  Cli,
  Commands,
  KeyMap,
  Node,
  Text,
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
  ProgressItem,
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
      const [command, ...rest] = args;
      commandEmitter.invokeCommand(command, selectedItem, rest);
    },
  } satisfies Commands;

  return (
    <Box flexDirection="column">
      <CommandList item={selectedProgress} />
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

function CommandList({ item }: { item: ProgressItem | undefined }) {
  if (!item) {
    return <Text color="red">No item selected</Text>;
  }

  return (
    <Box flexDirection="row" columnGap={0}>
      <Text color="green">Commands: </Text>
      {item.commands?.map((command, index) => {
        return (
          <Box key={index} flexDirection="row">
            <Text key={index} color="blue">
              {command.key}: 
            </Text>
            <Text color="gray">{command.name}</Text>
            <Text> | </Text>
          </Box>
        );
      })}
    </Box>
  );
}
