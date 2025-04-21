import React, { useState } from "react";
import { KeyMap, Node, useKeymap, useNodeMap, Viewport } from "tuir";
import { useProgress } from "../src/utils/ProgressContext.js";
import { ProgressVisualiser } from "../src/components/ProgressVisualiser.js";
import { Frame } from "../src/components/Frame.js";
import cliBoxes from "cli-boxes";
import ScrollingBox from "../src/components/ScrollingBox.js";
import { commandEmitter } from "../src/utils/commands.js";

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
    </Viewport>
  );
}

export function Root() {
  return <MainPage />;
}
