

function matrixPow(mat, pow)
{
    if (pow % 2 == 0)
    {
        let mat2 = matrixPow(mat, pow/2);
        return matrixMul(mat2, mat2);
    } 
    else if (pow > 1)
    {
        return matrixMul(matrixPow(mat, pow-1), matrix);
    }
    else return mat;
}

function matrixMul(mat1, mat2)
{
    let mat = [];
    for (let i=0; i<mat1.length; i++)
    {
        let vec = [];
        for (let j=0; j<mat1[i].length; j++)
        {
            let sum = 0;
            for (let k=0; k<mat1[i].length; k++)
            {
                sum += mat1[i][k] * mat2[k][j];
            }
            vec.push(sum % 26);
        }
        mat.push(vec);
    }
    return mat;
}

function matrixVec(mat, vec)
{
    let arr = [];
    for (let i=0; i<mat.length; i++)
    {
        let sum = 0;
        for (let j=0; j<vec.length; j++)
        {
            sum += mat[i][j] * vec[j];
        }
        arr.push(sum % 26);
    }
    return arr;
}

function vec2string(vec)
{
    let s = "";
    for (let i=0; i<vec.length; i++)
    {
        if (vec[i] == 0) s+="z";
        else s += String.fromCharCode("a".charCodeAt(0) + vec[i] - 1);
    }
    return s;
}

function string2vec(s)
{
    let v = [];
    for (let i=0; i<s.length; i++)
    {
        if (s[i] == 'z') v.push(0);
        else v.push(s.charCodeAt(i) - "a".charCodeAt(0) + 1);
    }
    return v;
}