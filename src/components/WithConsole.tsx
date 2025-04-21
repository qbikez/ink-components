import React, { PropsWithChildren, useEffect, useMemo } from "react";
import { consoleEmitter } from "../utils/console-utils.js";
import { useProgress } from "../utils/ProgressContext.js";

export function WithConsole({
  children,
  autoRefreshInterval
}: { autoRefreshInterval?: number } & PropsWithChildren) {
  const progress = useProgress();
  useMemo(() => {
    consoleEmitter.on("console", (stream: string, message: string) => {
      progress.logWithoutUpdate("console", [`${stream}: ${message}`]);
    });

    console.log("Console patch: %s %i", "DONE", 1);
  }, []);

  useEffect(() => {
    if (autoRefreshInterval) {
      const timer = setInterval(() => {
        progress.dispatch({ type: "refresh" });
      }, autoRefreshInterval);

      return () => {
        clearInterval(timer);
      };
    } else {
      return () => {};
    }
  }, [autoRefreshInterval]);

  return <>{children}</>;
}
