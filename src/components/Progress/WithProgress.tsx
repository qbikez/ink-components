import React, { PropsWithChildren, useLayoutEffect } from "react";
import { createProgress, Progress } from "./Progress.js";
import { progressEmitter } from "../../utils/commands.js";
import { ProgressContext } from "./ProgressContext.js";
import { ProgressUpdate } from "./progressItem.js";

export function WithProgress<TPath extends string | number | symbol>(
  props: PropsWithChildren
) {
  const progress = createProgress<TPath>();
  
  useLayoutEffect(() => {
    linkProgressToEmitter(progress);
  }, []);

  return (
    <ProgressContext.Provider value={progress}>
      {props.children}
    </ProgressContext.Provider>
  );
}

function linkProgressToEmitter(
  progress: Progress<string | number | symbol>
) {
  progressEmitter.on("log", (path, message, mode) => {
    switch (mode) {
      case 'sync':
        progress.log(path, [message]);
        break;
      case 'async':
        progress.logWithoutUpdate(path, [message]);
        break;
      default:
        throw new Error(`Unknown log mode: ${mode}`);
    }
  });

  progressEmitter.on(
    "update",
    (path: string, value: ProgressUpdate) => {
      progress.update(path, value);
    }
  );

  progressEmitter.on("setCommands", (path, commands) => {
    progress.setCommands(path, commands);
  });
}
