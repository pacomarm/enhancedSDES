import { process } from "./encrypt.mjs";

const plainText = '10000001';

const cipherText = process(plainText, true);
console.log('Encrypted Message', cipherText);

const gottenPlainText = process(cipherText, false);
console.log('Original Message', gottenPlainText);
