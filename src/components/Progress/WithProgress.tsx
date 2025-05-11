import React, { PropsWithChildren, useLayoutEffect } from "react";
import { createProgress, ProgressReducer } from "./ProgressReducer.js";
import { progressEmitter } from "../../utils/commands.js";
import { ProgressContext } from "./ProgressContext.js";
import { ProgressUpdate } from "./progress.js";

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
  progress: ProgressReducer<string | number | symbol>
) {
  progressEmitter.on("log", (path, message) => {
    // if there's a console.log call in a render path, it would cause log update, which will cause re-render, which will call console.log and cause infinite loop. To avoid that, we don't cause state change when logging from console, unless it's a console.log! call.
    let shouldUpdate = true;
    if (path == "console") {
      shouldUpdate = false;
    }
    if (path == "console!") {
      shouldUpdate = true;
      path = path.substring(0, path.length - 1);
    }
    if (shouldUpdate) {
      progress.log(path, [message]);
    } else {
      progress.logWithoutUpdate(path, [message]);
    }
  });

  progressEmitter.on(
    "update",
    (path: string, value: Partial<ProgressUpdate>) => {
      progress.update(path, value);
    }
  );
}
