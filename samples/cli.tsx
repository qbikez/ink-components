import React from "react";

import { render } from "tuir";
import { patchConsole } from "../src/utils/console-utils.js";
import { Root } from "./Root.js";
import { WithProgress } from "../src/components/WithProgress.js";
import { WithConsole } from "../src/components/WithConsole.js";

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
