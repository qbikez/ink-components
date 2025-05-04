import React from "react";
import { useEffect } from "react";
import { Box, Pages, StdinState, Text, useKeymap, usePages, Viewport, } from "./dependencies/tuir.js";
import { PageIndicator, progressEmitter } from "./dependencies/ink-components.js";
import { MasterDetail } from "./Pages/MasterDetail.js";
import { SimpleLog } from "./Pages/Simple.js";
const VARIANTS = ["simple", "master-detail"];
export function Root({ init, variant: initialVariant, } = {}) {
    initialVariant ??= "simple";
    const variants = VARIANTS;
    const [variant, setVariant] = React.useState(initialVariant);
    const { pageView, control: pageControl } = usePages(variants.length);
    usePageNavigation(variants, pageControl);
    useEffect(() => {
        const index = variants.indexOf(variant);
        if (index === -1) {
            console.warn("Invalid variant selected:", variant);
            return;
        }
        pageControl.goToPage(index);
    }, [variant]);
    useEffect(() => {
        progressEmitter.on("command", (command, path, args) => {
            if (command === "setVariant") {
                setVariant(args[0]);
            }
        });
    }, [progressEmitter]);
    useEffect(() => {
        if (init) {
            init();
        }
    }, []);
    return (React.createElement(Viewport, { flexDirection: "column" },
        React.createElement(Pages, { pageView: pageView },
            React.createElement(SimpleLog, null),
            React.createElement(MasterDetail, null)),
        React.createElement(PageIndicator, { pageNames: variants, currentPage: pageControl.currentPage }),
        React.createElement(Box, { marginTop: -1 },
            React.createElement(Text, null, "\u2328\uFE0F "),
            React.createElement(StdinState, { showEvents: true, showRegister: true, eventStyles: {
                    color: "green",
                }, registerStyles: {
                    color: "blue",
                }, width: 25 }))));
}
function usePageNavigation(pageNames, pageControl) {
    const pagesKeymap = {
        goToPage: pageNames.map((_, idx) => ({
            input: `${idx + 1}`,
        })),
        quit: { input: "q" },
        //command: { input: ":", key: "f1" },
    };
    const { useEvent } = useKeymap(pagesKeymap);
    useEvent("quit", () => {
        process.exit(0);
    });
    useEvent("goToPage", (char) => {
        const pageIndex = Number(char);
        if (!Number.isNaN(pageIndex) &&
            pageIndex > 0 &&
            pageIndex <= pageNames.length) {
            pageControl.goToPage(pageIndex - 1);
        }
    });
}
//# sourceMappingURL=Root.js.map