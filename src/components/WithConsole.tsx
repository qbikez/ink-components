import React, {
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
import { consoleEmitter } from "../utils/console-utils.js";
import { useProgress } from "./Progress/useProgress.js";
import { progressEmitter } from "../utils/commands.js";

export function WithConsole({
  children,
  autoRefreshInterval,
  path = "console",
}: { autoRefreshInterval?: number; path?: string } & PropsWithChildren) {
  useLayoutEffect(() => {
    linkConsoleToProgress(path);
  }, []);

  const progress = useProgress();
  useEffect(() => {
    if (autoRefreshInterval) {
      const timer = setInterval(() => {
        progress.refresh();
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

function linkConsoleToProgress(path: string) {
  consoleEmitter.on("console", (stream: string, message: string) => {
    const important = stream === "error" || stream === "warn";
    progressEmitter.log(path, `${stream}: ${message}`, important ? 'sync' : 'async');
  });

  console.log("Console patch: %s %i", "DONE", 1);
}
