import { createHash } from 'crypto';
import { generate } from 'brute-force-generator';
import { workerData, parentPort } from 'worker_threads';

function setRange() {
    const quotient = 170808406779660/workerData.threadsNumber;
    const range = [];
    for (let i = 1; i < workerData.threadsNumber + 1; i++) {
        range.push(quotient*i);
    }
    return range;
}

function crackHash(hashToCrack, index) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const combos = generate(chars.split(''), 8);
    let i = 1;
    const start = Date.now();
    const range = setRange();
    lol:
    for (const record of combos) {
        const hash = createHash('sha256');
        hash.update(record);
        parentPort.postMessage(1);
        i++;
        
        //Make sure each thread is in its range
        for (let n = 1; n < workerData.threadsNumber + 1; n++) {
            if (index !== n) {
                continue;
            } else {
                if (index === 1) {
                    if (i > range[0]) {
                        break lol;
                    }
                } else {
                    if (i < range[index-1]) {
                        continue lol;
                    } else if (i > range[index]) {
                        break lol;
                    }
                }
            }
        }

        if (hash.digest('hex') === hashToCrack) {
            console.log(`\n[+] Match found: \n\t${record}\nTime taken: ${Date.now() - start}ms`);
            process.exit(0);
        }
    }
    process.exit(2);
}

crackHash(workerData.hashToCrack, workerData.i);