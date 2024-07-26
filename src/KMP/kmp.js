import React from "react"

function KmpSearch(pat, txt){
    var M = pat.length
    var N = Number(txt.length)
 
    //create lps[] that will hold the longest prefix suffix 
    //values for pattern
    var lps = new Array(M).fill(0)
    var j = 0 // index for pat[]
 
    //Preprocess the pattern (calculate lps[] array)
    computeLPSArray(pat, M, lps)
 
    var i = 0 //index for txt[]
    while(i < N){
        if(pat[j] === txt[i]){
            i += 1
            j += 1
        }
 
        if(j === M){
            console.log("Found pattern at index", String(i-j))
            j = lps[j-1]
        }
 
        //mismatch after j matches
        else if(i < N && pat[j] !== txt[i]){
            //Do not match lps[0..lps[j-1]] characters,
            //they will match anyway
            if (j !== 0){
                j = lps[j-1]
            }
            else{
                i += 1
            }
        }
    }
}

function computeLPSArray(pat, M, lps){
    var len = 0

    lps[0] = 0 
    var i = 1

    while(i < M){
        if(pat[i] === pat[len]){
            len += 1
            lps[i] = len
            i += 1
        }else{
            if(len !== 0){
                len = lps[len -1]
            }else{
                lps[i] = 0
                i += 1
            }
        }
    }
}

function KMP(){

    var txt = "ABABDABACDABABCABAB"
    var pat = "ABABCABAB"
    KmpSearch(pat, txt)

    return(
        <h1>Oii</h1>
    );
}

export default KMP;