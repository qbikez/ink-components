import React, { PropsWithChildren, useEffect, useMemo } from "react";
import {
  ProgressContextState,
  createProgress,
  ProgressContextType,
  ProgressContext,
} from "../utils/ProgressContext.js";
import { progressEmitter, ProgressItemState } from "../utils/commands.js";

export function WithProgress<TPath extends string | number | symbol>(props: PropsWithChildren) {
  const progressState: ProgressContextState<string> = {
    id: 0,
    root: {},
  };

  const [state, dispatchProgress] = createProgress(progressState);
  const progress = new ProgressContextType(state, dispatchProgress);

  useEffect(() => {
    progressEmitter.on('log', (path, message) => {
      progress.logWithoutUpdate(path, [message]);
    });

    progressEmitter.on('update', (
          path: string,
          state: ProgressItemState,
          status?: string,
          details?: string
        ) => {
      progress.update(path, state, status, details);
    });

  }, []);

  return (
    <ProgressContext.Provider value={progress}>
      {props.children}
    </ProgressContext.Provider>
  );
}
