export const setCols = (string, cols) => {
    let mtx = [[]]
    let row = 0;
    let col = 0;
    for(let i = 0; i<string.length; i++){
        if(col>=cols){
            mtx.push([])
            col = 0;
            row++;
        } 
        mtx[row][col] = string[i];
        col++;
    }
    return mtx
}

const getTransposeMatrix = (matrix) => {
    let transposedMatrix = Array.from(Array(matrix.length), () => new Array(matrix[0].length));
    for (let i = 0; i < matrix.length; i++){
        for (let j = 0; j < matrix[i].length; j++){
            transposedMatrix[j][i] = matrix[i][j];
        }
    }
    return transposedMatrix;
}

export const transposeColumns = (matrix, order) => {
    const transposedMatrix = getTransposeMatrix(matrix); 
    let result = Array.from(Array(matrix.length), () => new Array(matrix[0].length));
    for (let i = 0; i < matrix.length; i++){
        result[i] = transposedMatrix[order[i] - 1];
    }
    return result;
}

export const getStringFromMatrix = (matrix) => {
    let str = ''
    for (let i = 0; i < matrix.length; i++){
        for (let j = 0; j < matrix[i].length; j++){
            str += matrix[i][j];
        }
    }
    return str
}