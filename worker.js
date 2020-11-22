const { createHash } = require('crypto');
const { generate } = require('brute-force-generator');
const { workerData, parentPort, terminate } = require('worker_threads');

function crackHash(hashToCrack, range) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const combos = generate(chars.split(), 8);
    let i = 1;
    const start = Date.now();
    const hash = createHash('sha256');
    for (const record of combos) {
        hash.update(record);
        console.log(`[+] Tried ${i} combination(s)`);
        i++;
        
        if (range === 1) {
            if (i > 42702101694915) {
                break;
            }
        } else if (range === 2) {
            if (i < 42702101694915) {
                continue;
            } else if (i > 85404203389830) {
                break;
            }
        } else if (range === 3) {
            if (i < 85404203389830) {
                continue;
            } else if (i > 128106305084745) {
                break;
            }
        } else if (range === 4) {
            if (i < 128106305084745) {
                continue;
            }
        }

        if (hash.digest('hex') === hashToCrack) {
            console.log(`\n[+] Match found: \n\t${record}`);
            console.log(`Time taken: ${Date.now() - start}ms`);
            break;
        }
    }
    terminate();
}

crackHash(workerData.hashToCrack, workerData.i);