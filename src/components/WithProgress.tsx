import React, { PropsWithChildren, useEffect, useMemo } from "react";
import {
  ProgressContextState,
  createProgress,
  ProgressContextType,
  ProgressContext,
} from "../utils/ProgressContext.js";
import { progressEmitter, ProgressItemState } from "../utils/commands.js";

export function WithProgress<TPath extends string | number | symbol>(
  props: PropsWithChildren
) {
  const progressState: ProgressContextState<string> = {
    id: 0,
    root: {},
  };

  const [state, dispatchProgress] = createProgress(progressState);
  const progress = new ProgressContextType(state, dispatchProgress);

  useEffect(() => {
    progressEmitter.on("log", (path, message) => {
      if (path == "console" && !path.endsWith("!")) {
        // if there's a console.log call in a render path, it would cause log update, which will cause re-render, which will call console.log and cause infinite loop. To avoid that, we don't cause state change when logging from console, unless it's a console.log! call.
        progress.logWithoutUpdate(path, [message]);
      } else {
        progress.log(path.substring(0, path.length - 1), [message]);
      }
    });

    progressEmitter.on(
      "update",
      (
        path: string,
        state: ProgressItemState,
        status?: string,
        details?: string
      ) => {
        progress.update(path, state, status, details);
      }
    );
  }, []);

  return (
    <ProgressContext.Provider value={progress}>
      {props.children}
    </ProgressContext.Provider>
  );
}
