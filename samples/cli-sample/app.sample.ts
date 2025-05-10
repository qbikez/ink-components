import cli from "./cli.js";

cli.commandEmitter.on("invoke", (command, path, args) => {
  cli.progressEmitter.log("commands", `Command: [${path}]:${command} [${args}](${args.length})`);
});

cli.cli({
  init: () => {
    console.log("Hello World!");
    cli.progressEmitter.log(
      "init",
      "App initalizing..."
    );
    cli.progressEmitter.update("init", {
      progress: 5,
    });

    setTimeout(() => {
      cli.progressEmitter.log(
      "init",
      "Init DONE."
    );
      cli.progressEmitter.update("init", {
        state: "done",
        status: "Running",
        progress: 100,
      });
    }
    , 1000);
  },
  variant: "master-detail",
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
