import React from "react";

import { render } from "tuir";
import { Root } from "./Root.js";
import { patchConsole, WithConsole, WithProgress } from "ink-components";

export function cli() {
  patchConsole();

  render(
    <WithProgress>
      <WithConsole autoRefreshInterval={1000}>
        <Root />
      </WithConsole>
    </WithProgress>,
    {
      patchConsole: false,
    }
  );
}
