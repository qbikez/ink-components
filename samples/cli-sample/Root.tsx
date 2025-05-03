import React from "react";
import { useEffect } from "react";
import {
  Box,
  KeyMap,
  Pages,
  StdinState,
  Text,
  useKeymap,
  usePages,
  Viewport,
} from "./tuir.js";
import {
  PageIndicator,
  progressEmitter
} from "./ink-components.js";
import { MasterDetail } from "./Pages/MasterDetail.js";
import { SimpleLog } from "./Pages/Simple.js";
import { consoleEmitter } from "../../src/utils/console-utils.js";

type PagesReturn = ReturnType<typeof usePages>;
type PagesControl = PagesReturn["control"];

export function Root() {
  useEffect(() => {
    setTimeout(() => init(), 1000);
  }, []);

  const pageNames = ["Simple", "MasterDetail"];
  const { pageView, control: pageControl } = usePages(pageNames.length);

  usePageNavigation(pageNames, pageControl);

  return (
    <Viewport flexDirection="column">
      <Pages pageView={pageView}>
        <SimpleLog />
        <MasterDetail />
      </Pages>
      <PageIndicator
        pageNames={pageNames}
        currentPage={pageControl.currentPage}
      />
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
    </Viewport>
  );
}

function usePageNavigation(pageNames: string[], pageControl: PagesControl) {
  const pagesKeymap = {
    goToPage: pageNames.map((_, idx) => ({
      input: `${idx + 1}`,
    })),
    quit: { input: "q" },
    //command: { input: ":", key: "f1" },
  } satisfies KeyMap;
  const { useEvent } = useKeymap(pagesKeymap);

  useEvent("quit", () => {
    process.exit(0);
  });

  useEvent("goToPage", (char: string) => {
    const pageIndex = Number(char);

    if (
      !Number.isNaN(pageIndex) &&
      pageIndex > 0 &&
      pageIndex <= pageNames.length
    ) {
      pageControl.goToPage(pageIndex - 1);
    }
  });
}

export function init() {
  console.log("Initializing application...");
  console.warn("This is a warning message!");

  progressEmitter.update("root", 'running', "loading something...", "details are very important");
  progressEmitter.log("root", "this is a log message");
  progressEmitter.log("console", "progress.log");
  consoleEmitter.emit("console", "smoke", "manually emitted log message");

  setInterval(() => {
    console.log("tick");
  }, 1000);
}
