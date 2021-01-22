"use strict";

let NUMERAL = {
    0: "CERO",
    1: "UNO",
    2: "DOS",
    3: "TRES",
    4: "CUATRO",
    5: "CINCO",
    6: "SEIS",
    7: "SIETE",
    8: "OCHO",
    9: "NUEVE",
    10: "DIEZ",
    11: "ONCE",
    12: "DOCE",
    13: "TRECE",
    14: "CATORCE",
    15: "QUINCE",
    16: "DIECISEIS",
    17: "DIECISIETE",
    18: "DIECIOCHO",
    19: "DIECINUEVE",
    20: "VEINTE",
    30: "TREINTA",
    40: "CUARENTA",
    50: "CINCUENTA",
    60: "SESENTA",
    70: "SETENTA",
    80: "OCHENTA",
    90: "NOVENTA"
};

const MULTIPLOS = {
    10: "CERO ",
    2: "VEINTI"
};

for (let x = 3; x < 10; x++) {
    MULTIPLOS[x] = NUMERAL[x * 10] + " Y ";
}

for (let x = 2; x < 11; x++) {
    for (let y = 1; y < 10; y++) {
        NUMERAL[(x * 10) + y] = [MULTIPLOS[x], NUMERAL[y]].join("");
    }
}

export function NumberToWordsFilter() {
    return function (value) {
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
            let parts = value.toString().split(".");

            if(parts.length === 1){ parts.push("0"); }
            if(parts[1].length === 1){ parts[1] = `${parts[1]}0`; }

            let integer = parseInt(parts[0]),
                decimals = parseInt(parts[1].slice(0, 2));

            if(decimals > 0 && decimals < 10){ decimals += 100; }

            return [NUMERAL[integer], "COMA", NUMERAL[decimals]].join(" ");
        }
        return value;
    };
}