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
  PageIndicator
} from "./ink-components.js";
import { init } from "./init.js";
import { SimplePage } from "./Pages/Simple.js";

type PagesReturn = ReturnType<typeof usePages>;
type PagesControl = PagesReturn["control"];

export function Root() {
  useEffect(() => {
    init();
  }, []);

  const pageNames = ["Simple"];
  const { pageView, control: pageControl } = usePages(pageNames.length);

  usePageNavigation(pageNames, pageControl);

  return (
    <Viewport flexDirection="column">
      <Pages pageView={pageView}>
        <SimplePage />
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
