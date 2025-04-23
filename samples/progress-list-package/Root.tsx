import React, { useEffect, useState } from "react";
import {
  Box,
  Cli,
  Commands,
  KeyMap,
  Node,
  StdinState,
  Text,
  useCommand,
  useKeymap,
  useNodeMap,
  Viewport,
} from "tuir";
import { init } from "./init";
import { useProgress } from "ink-components/build/utils/ProgressContext";
import { commandEmitter, Frame, ProgressVisualiser } from "ink-components";
import cliBoxes from "cli-boxes";
import ScrollingBox from "ink-components/build/components/ScrollingBox";

export function MainPage() {
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
    'q': async (args) => {
      process.exit(0);
    },
    DEFAULT: async (args) => {
      console.warn("Command invoked!", args);
    },
  } satisfies Commands;

  return (
    <Viewport flexDirection="column">
      <Node {...register("list")}>
        <Frame height={10} borderStyle={{ ...cliBoxes.doubleSingle }}>
          <ProgressVisualiser
            progress={progress}
            onItemSelected={(i) => setSelectedItem(i)}
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
      <Box marginTop={-1}>
        <Text>⌨️ </Text>
        <StdinState
          showEvents={true}
          showRegister={true}
          eventStyles={{
            color: "green",
          }}
          registerStyles={{
            color: "blue",
          }}
          width={25}
        />
      </Box>
      <Cli commands={commands}></Cli>
    </Viewport>
  );
}

export function Root() {
  useEffect(() => {
    init();
  }, []);

  return <MainPage />;
}
