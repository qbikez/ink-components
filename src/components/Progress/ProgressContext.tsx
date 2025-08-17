import { createContext } from "react";
import { Progress } from "./Progress.js";

// export type ProgressPath =
//   | "main|signalR"
//   | "server"
//   | "client"
//   | "main"
//   | "main|stdin"
//   | "console";

export const ProgressContext = createContext<
  Progress<string>
>(null as any);


