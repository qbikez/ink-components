import React, { useEffect } from "react";
import { Box, Cli, Node } from "../tuir.js";
import {
  ProgressVisualiser,
  Frame,
  ScrollingBox,
  progressEmitter,
  ProgressItemState,
} from "../ink-components.js";
import cliBoxes from "cli-boxes";

export function SimpleLog() {
  const [log, setLog] = React.useState<string[]>(["nothing to show"]);
  useEffect(() => {
    const logListener = (path: string, message: string) => {
      setLog((prevLog) => [...prevLog, `L[${path}] ${message}`]);
    };
    const updateListener = (
      path: string,
      state: ProgressItemState,
      status?: string,
      details?: string
    ) => {
      setLog((prevLog) => [...prevLog, `S[${path}] ${state}: ${status} (${details})`]);
    };

    progressEmitter.on("log", logListener);
    progressEmitter.on("update", updateListener);

    return () => {
      progressEmitter.off("log", logListener);
      progressEmitter.off("update", updateListener);
    };
  }, []);

  return <ScrollingBox data={log} />;
}
