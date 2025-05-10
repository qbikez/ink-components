import cli from "./cli.js";

cli.cli({
  init: () => {
    console.log("Hello World!");
    cli.progressEmitter.log(
      "init",
      "App initialized. Starting progress..."
    );
    cli.progressEmitter.update("init", {
      progress: 100,
    });
  },
  variant: "treeview",
});

// cli({
//     init: () => {
//         console.log("CLI initialized");
//         let i = 0;
//         setInterval(() => {
//             console.log(`heartbeat ${i++}`);
//             progressEmitter.update(`beat|${i}`, {
//                 state: "running",
//                 status: "beating",
//                 details: `beat.${i}`,
//             });
//             progressEmitter.update(`beat`, {
//                 state: "running",
//                 status: "beating",
//                 details: `beat.${i}`,
//                 progress: i,
//             });
//         }, 100);
//     },
//     variant: "master-detail",
// });
