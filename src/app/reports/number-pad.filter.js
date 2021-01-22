
'use strict';

export function NumberPadFilter(){
    return function (value) {
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
            let parts = value.toString().split(".");

            if(parts.length === 1){ parts.push("0"); }
            if(parts[1].length === 1){ parts[1] = `${parts[1]}0`; }

            let integer = parseInt(parts[0]),
                decimals = parseInt(parts[1].slice(0, 2));

            return integer + (decimals / 100);
        }
        return value;
    }
}