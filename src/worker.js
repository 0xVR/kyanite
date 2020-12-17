import { createHash } from 'crypto';
import { workerData, parentPort } from 'worker_threads';
import { generator } from 'indexed-string-variation';
import bigInt from 'big-integer';

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

  if (!Number.isSafeInteger(i)) {
    break;
  }
}

while (!hashCracked) {
  const hash = createHash('sha256');
  hash.update(variations(bigInt(i)));
  parentPort.postMessage('increment');

  if (hash.digest('hex') === workerData.hashToCrack) {
    console.log(
      `\n[+] Match found: \n\t${variations(bigInt(i))}\nTime taken: ${
        Date.now() - start
      }ms`
    );
    hashCracked = true;
  }

  i += workerData.threadsNumber;
}
