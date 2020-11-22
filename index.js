const { Worker } = require('worker_threads');
const readline = require("readline");

function takeInput(q) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(resolve => rl.question(q, ans => {
        rl.close();
        resolve(ans);
    }))
}

async function main() {
    console.log('=-=-=-=-=-=-=-=-=-=-=\n    Hash Cracker\n=-=-=-=-=-=-=-=-=-=-=');
    console.log('Please enter the SHA256 hash you want to crack:');
    const hashToCrack = await takeInput('> ');
    const threads = new Set();
    for (let i = 1; i < 5; i++) {
        threads.add(new Worker('./worker.js', { workerData: { hashToCrack, i } }));
    }
    for (const worker of threads) {
        worker.on('exit', () => {
            threads.delete(worker);
        })
        worker.on('error', e => {
            console.log(e);
        })
        }
}

try {
    main();
} catch(e) {
    console.log(e);
}