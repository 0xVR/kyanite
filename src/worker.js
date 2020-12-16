import { createHash } from 'crypto';
import { workerData, parentPort } from 'worker_threads';
import { generator } from 'indexed-string-variation';

const start = Date.now();
let { i } = workerData;
const variations = generator(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
);
let hashCracked = false;

while (!hashCracked) {
  const hash = createHash('sha256');
  hash.update(variations(i));
  parentPort.postMessage('increment');

  if (hash.digest('hex') === workerData.hashToCrack) {
    console.log(
      `\n[+] Match found: \n\t${variations(i)}\nTime taken: ${
        Date.now() - start
      }ms`
    );
    hashCracked = true;
  }

  i += workerData.threadsNumber;
}

process.exit(0);
