import { cli } from "./cli.js";

cli({
    init: () => {
        console.log("CLI initialized");
    },
    variant: "master-detail",
});