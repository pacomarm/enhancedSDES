import { IP } from "./constants.mjs";
import { INVP } from "./constants.mjs";
import { initialKey } from "./constants.mjs";
import { getKeys } from "./keyOps.mjs";
import { permutations } from "./keyOps.mjs";
import { sw } from "./textOps.mjs";
import { f } from "./textOps.mjs";

export const process = (plainText, encrypt) =>{
    let {p8PermutedKey, p8PermutedKey2} = getKeys(initialKey);
    if(!encrypt){
        const space = p8PermutedKey;
        p8PermutedKey = p8PermutedKey2;
        p8PermutedKey2 = space;
    }
    const afterIP = permutations(IP, plainText);
    const leftSide  = afterIP.slice(0,4);
    const rightSide = afterIP.slice(4,8);
    const fOutput = f(leftSide, rightSide, p8PermutedKey);
    const afterSW = sw(fOutput);
    const ls2  = afterSW.slice(0,4);
    const rs2 = afterSW.slice(4,8);
    const fOutput2 = f(ls2, rs2, p8PermutedKey2);
    const afterINVP = permutations(INVP, fOutput2);
    return afterINVP;
}


