import React from "react";
import { Box, Text } from "../tuir.js";
export function WithRenderCount({ children, autoRefreshInterval, mode = 'box', }) {
    const renderCount = React.useRef(0);
    renderCount.current += 1;
    return (React.createElement(Box
    //width="100%"
    // borderStyle={{
    //   top: "-",
    //   bottom: "-",
    //   left: "",
    //   right: "",
    //   topLeft: "",
    //   topRight: "",
    //   bottomLeft: "",
    //   bottomRight: "",
    // }}
    // borderBottom={false}
    // borderLeft={false}
    // borderRight={false}
    // borderTop={true}
    // borderColor={"gray"}
    , { 
        //width="100%"
        // borderStyle={{
        //   top: "-",
        //   bottom: "-",
        //   left: "",
        //   right: "",
        //   topLeft: "",
        //   topRight: "",
        //   bottomLeft: "",
        //   bottomRight: "",
        // }}
        // borderBottom={false}
        // borderLeft={false}
        // borderRight={false}
        // borderTop={true}
        // borderColor={"gray"}
        titleTopRight: { title: `R:${renderCount.current}` }, flexDirection: "row", flexGrow: 10 },
        children,
        mode == "inline" ? React.createElement(Text, null,
            "[",
            renderCount.current,
            "]") : null));
}
//# sourceMappingURL=WithRenderCount.js.map