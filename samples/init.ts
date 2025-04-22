import { progressEmitter, commandEmitter } from "../src/utils/commands.js";

export function init() {
  console.log("Initializing application...");

  progressEmitter.update("root", 'running', "loading something...", "details are very important");
}
