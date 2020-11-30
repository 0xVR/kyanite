import { Worker } from 'worker_threads';
import { createInterface } from 'readline';

function takeInput(q) {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(resolve => rl.question(q, ans => {
        rl.close();
        resolve(ans);
    }))
}

console.log('=-=-=-=-=-=-=-=-=-=-=\n    Kyanite\n=-=-=-=-=-=-=-=-=-=-=');
console.log('Please enter the SHA256 hash you want to crack:');
const hashToCrack = await takeInput('> ');
console.log('Please enter the number of threads you would like to be used (defaults to 4):');
let threadsNumber = Number(await takeInput('> '));
if (isNaN(threadsNumber)) {
    console.log('Please enter a number');
    process.exit();
}
if (threadsNumber < 1) {
    threadsNumber = 4;
} else if (170808406779660 % threadsNumber !== 0) {   //Make sure that the factorial can be evenly divdied into the number of threads
    threadsNumber = threadsNumber - (170808406779660 % threadsNumber)
}
console.log(`Starting with ${threadsNumber} threads`);

let total = 0;
const counter = setInterval(() => process.stdout.write(`\r\x1b[K[+] Tried ${total} combination(s)`), 250);

const threads = new Set();
for (let i = 1; i < threadsNumber + 1; i++) {
    const worker = new Worker('./worker.js', { workerData: { hashToCrack, i, threadsNumber } });
    threads.add(worker);
    worker.on('message', () => {
        total += 1;
    })
    worker.on('exit', c => {
        threads.delete(worker);
        if (c === 0) {
            threads.forEach(thread => {
                thread.terminate();
                threads.delete(thread);
            });
            clearInterval(counter);
        } else if (threads.size === 0) {
            clearInterval(counter);
        }
    })
    worker.on('error', e => {
        console.error(e);
    })
}
