import { cli } from "./cli.js";

cli({
    init: () => {
        console.log("CLI initialized");
        let i = 0;
        setInterval(() => {
            console.log(`heartbeat ${i++}`);
        }, 100);
    },
    variant: "master-detail",
});