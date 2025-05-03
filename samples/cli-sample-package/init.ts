import { progressEmitter } from "ink-components";

export function init() {
  console.log("Initializing application...");

  progressEmitter.update("root", 'running', "loading something...", "details are very important");
}
