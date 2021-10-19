import { sBox0 } from "./constants.mjs";
import { P4 } from "./constants.mjs";
import { sBox1 } from "./constants.mjs";
import { EP } from "./constants.mjs";
import { permutations } from "./keyOps.mjs";

export const f = (left, right, p8PermutedKey) => {
  const modifiedRight = bigF(right, p8PermutedKey);
  const xored = xor(left, modifiedRight, 4);
  return xored + right;
}

const bigF = (right, subkey) => {
  if(right.length!=4){console.log('Tamaño substirng incorrecto')}
  if(subkey.length!=8){console.log('Tamaño subkey incorrecto')}
  const expandedText = permutations(EP, right);
  const xored = xor(expandedText, subkey, 8);
  const leftSide = xored.slice(0,4);
  const rightSide = xored.slice(4,8);
  // console.log('leftSide',leftSide);
  // console.log('rightSide',rightSide);
  const reducedLeft = sboxing(leftSide, sBox0);
  const reducedRight = sboxing(rightSide, sBox1);
  return permutations(P4, reducedLeft+reducedRight);
}
  
const xor = (halfClearText, key, size) => {
  if(halfClearText.length!=key.length){return console.log('Cant xor')}
  return resize(((parseInt(halfClearText, 2) ^ parseInt(key, 2)) >>> 0).toString(2), size);
};

export const resize = (str, desiredLength) => {
  if(str.length==desiredLength){return str}
  let fixedStr = `${str}`;
  for(let i=0; i<desiredLength-str.length;i++){
    fixedStr = '0'+fixedStr;
  }
  return fixedStr
}

const sboxing = (substring, sbox) => {
  const li = parseInt(outerBits(substring), 2);
  const ri = parseInt(innerBits(substring), 2);
  if(li<0 || li>3 || ri<0 || ri>3){console.log('Error indices Sbox')}
  return resize(sbox[li][ri].toString(2), 2);
}

const outerBits = (stringHalf) => {
  return resize(stringHalf.charAt(0) + stringHalf.slice(-1), 2);
};

const innerBits = (stringHalf) => {
  return resize(stringHalf.slice(1, -1), 2);
};

export const sw = (str) => {
  return str.slice(4,8)+str.slice(0,4)
}