import React from "react";
import { ProgressContext } from "./ProgressContext.js";
export function useProgress() {
    const context = React.useContext(ProgressContext);
    if (context === null) {
        throw new Error("useProgress must be used within a ProgressProvider");
    }
    return context;
}
//# sourceMappingURL=useProgress.js.map