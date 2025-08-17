import React from "react";
import { ProgressContext } from "./ProgressContext.js";
import { Progress } from "./Progress.js";


export function useProgress<TPath extends string | number | symbol = string>(): Progress<TPath> {
  const context = React.useContext(ProgressContext);
  if (context === null) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context as Progress<TPath>;
}
