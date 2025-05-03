import { progressEmitter, commandEmitter } from "./ink-components.js";

export function init() {
  console.log("Initializing application...");

  progressEmitter.update("root", 'running', "loading something...", "details are very important");
}
