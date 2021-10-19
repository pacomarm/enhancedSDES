import { p10Positions, p8Positions } from "./constants.mjs";

export const permutations = (permutedPositions, stringToPermute) => {
  const result = permutedPositions.map( itr => stringToPermute[itr - 1]).join('');
  return result;
};

export const leftShiftOperation = (str, leftShifts) => {
  let part1 = str.slice(0, 5);
  let part2 = str.slice(5, 10);
  return circularShift(part1, leftShifts)+circularShift(part2, leftShifts);
};

export const circularShift = (str, index) => {
  let rotated= ''
  for(let i=index; i< str.length;i++){
    rotated+=str[i];
  }
  for(let i=0; i< index;i++){
    rotated+=str[i];
  }
  return rotated;
}

export const getKeys = (initialKey) => {
  const p10PermutedKey = permutations(p10Positions, initialKey);
  const leftShiftedKey1 = leftShiftOperation(p10PermutedKey, 1);
  const p8PermutedKey = permutations(p8Positions, leftShiftedKey1);
  const leftShiftedKey2 = leftShiftOperation(leftShiftedKey1, 2);
  const p8PermutedKey2 = permutations(p8Positions, leftShiftedKey2);
  return {p8PermutedKey,p8PermutedKey2}
}


