import { createContext } from "react";
import { ProgressReducer } from "./ProgressReducer.js";

// export type ProgressPath =
//   | "main|signalR"
//   | "server"
//   | "client"
//   | "main"
//   | "main|stdin"
//   | "console";

export const ProgressContext = createContext<
  ProgressReducer<string>
>(null as any);


