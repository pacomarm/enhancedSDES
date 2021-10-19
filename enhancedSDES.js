import { process } from "./encrypt.mjs";
import { transposeColumns } from "./enhancedOps.mjs";
import { getStringFromMatrix } from "./enhancedOps.mjs";
import { setCols } from "./enhancedOps.mjs";
import { circularShift } from "./keyOps.mjs";
import { resize } from "./textOps.mjs";

const plaintext = 'didyousee';
console.log('Plaintext', plaintext);
const fixedColsMatrix = setCols(plaintext.replace(/ /g, ''), 3);
let rounds = 2;
let shiftedColsMatrix = fixedColsMatrix;
while(rounds > 0){
    shiftedColsMatrix = transposeColumns(shiftedColsMatrix, [2,3,1]);
    rounds--;
}
const row1 = shiftedColsMatrix[0];
const row2 = circularShift(shiftedColsMatrix[1].join(''),1).split('')
const row3 = circularShift(shiftedColsMatrix[2].join(''),2).split('')
const strMatrix = getStringFromMatrix([row1, row2, row3]);

let encryptedText='';
// let hex = ''
for(const letter of strMatrix){
    encryptedText += process(resize(letter.charCodeAt(0).toString(2), 8), true)+' ';
    // hex += parseInt(process(resize(letter.charCodeAt(0).toString(2), 8), true)+' ', 2).toString(16).toUpperCase(); 
}
// console.log(hex);
console.log('Encrypted Text', encryptedText);
console.log('----');
//Decrypted
const cipherText = encryptedText.split(' ').slice(0,-1);
let afterSDES = ''
for(const letter of cipherText){
    afterSDES += String.fromCharCode(parseInt(process(letter, false), 2));
}

const strAsMatrix = setCols(afterSDES, 3);
const drow1 = strAsMatrix[0];
const drow2 = circularShift(strAsMatrix[1].join(''),2).split('')
const drow3 = circularShift(strAsMatrix[2].join(''),1).split('')
const reverseShiftRowMatrix = [drow1,drow2, drow3];
rounds = 2;
let reverseSCTM = reverseShiftRowMatrix;
while(rounds > 0){
    reverseSCTM = transposeColumns(reverseSCTM, [3,1,2]);
    rounds--;
}
console.log('Decrypted Text: ', getStringFromMatrix(reverseSCTM));
