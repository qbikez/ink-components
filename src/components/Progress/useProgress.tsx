import React from "react";
import { ProgressContext } from "./ProgressContext.js";
import { ProgressReducer } from "./ProgressReducer.js";


export function useProgress<TPath extends string | number | symbol = string>() {
  const context = React.useContext(ProgressContext);
  if (context === null) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context as ProgressReducer<TPath>;
}
