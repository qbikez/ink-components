import React from "react";

import { render } from "./tuir.js";
import { patchConsole, WithProgress, WithConsole } from "./ink-components.js";
import { Root } from "./Root.js";
import ansiEscapes from "ansi-escapes";

export function cli({ init }: { init?: () => void } = {}) {
  patchConsole();

  var root = (
    <WithProgress>
      <WithConsole autoRefreshInterval={1000}>
        <Root init={init} />
      </WithConsole>
    </WithProgress>
  )
  render(root, {
    patchConsole: false,
    debug: false,
    ansiEscapeChars: {
      clearScreen: ansiEscapes.clearScreen
    }
  });
}

export { commandEmitter, progressEmitter } from "./ink-components.js";