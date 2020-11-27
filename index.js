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
    let total = 0;
    const counter = setInterval(() => process.stdout.write(`\r\x1b[K[+] Tried ${total} combination(s)`), 250);
    const threads = new Set();
    for (let i = 1; i < 5; i++) {
        const worker = new Worker('./worker.js', { workerData: { hashToCrack, i } });
        threads.add(worker);
        worker.on('message', () => {
            total += 1;
        })
        worker.on('exit', c => {
            threads.delete(worker);
            if (c === 2) {
                threads.forEach(thread => {
                    thread.terminate();
                    threads.delete(thread);
                });
                clearInterval(counter);
            }
        })
        worker.on('error', e => {
            console.error(e);
        })
    }
}

main().catch(e => console.error(e));