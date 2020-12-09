import { Worker } from "worker_threads";
import { createInterface } from "readline";
import yargs from "yargs";
import { cpus } from "os";

function takeInput(q) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(q, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

console.log("=-=-=-=-=-=-=-=-=-=-=\n    Kyanite\n=-=-=-=-=-=-=-=-=-=-=\n");
let threadsNumber = cpus().length;
let hashToCrack = "";

if (process.argv.length > 2) {
  const argv = yargs(process.argv.splice(2))
    .demandCommand(1)
    .option("threads", {
      alias: "t",
      description: "Number of threads to use",
      type: "number",
      default: cpus().length,
    })
    .usage("Usage: npm start -- HASH [OPTIONS]")
    .help()
    .alias("help", "h").argv;

  hashToCrack = argv._[0];
  threadsNumber = argv.t;
} else {
  console.log("Please enter the SHA256 hash you want to crack:");
  hashToCrack = await takeInput("> ");
  console.log(
    "Please enter the number of threads you would like to be used (defaults to however many you have):"
  );
  threadsNumber = Number(await takeInput("> "));
}

if (isNaN(threadsNumber) || threadsNumber < 1) {
  threadsNumber = cpus().length;
}
if (170808406779660 % threadsNumber !== 0) {
  //Make sure that the factorial can be evenly divdied into the number of threads
  while (170808406779660 % threadsNumber !== 0) {
    threadsNumber -= 1;
  }
}
console.log(`Starting with ${threadsNumber} threads`);

let total = 0;
const counter = setInterval(
  () => process.stdout.write(`\r\x1b[K[+] Tried ${total} combination(s)`),
  250
);

const threads = new Set();
for (let i = 1; i < threadsNumber + 1; i++) {
  const worker = new Worker("./src/worker.js", {
    workerData: { hashToCrack, i, threadsNumber },
  });
  threads.add(worker);
  worker.on("message", () => {
    total += 1;
  });
  worker.on("exit", (c) => {
    threads.delete(worker);
    if (c === 0) {
      threads.forEach((thread) => {
        thread.terminate();
        threads.delete(thread);
      });
      clearInterval(counter);
    } else if (threads.size === 0) {
      clearInterval(counter);
    }
  });
  worker.on("error", (e) => {
    console.error(e);
  });
}
