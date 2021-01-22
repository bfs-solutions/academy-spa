"use strict";

export function NumberToProjectFilter() {
    return function (value) {
        if (value >= 7.5 && value <= 10) {
            value = 'Excelente'
        }
        else if (value >= 5 && value < 7.5) {
            value = 'Muy Buena'
        }
        else if (value >= 2.5 && value < 5) {
            value = 'Buena'
        }
        else if (value >= 0 && value < 2.5) {
            value = 'Regular'
        }
        else { value = ''; }

        return value;
    };
}

export function ProjectToNumberFilter() {
    return function (value) {
        switch(value) {
            case 'E':
                value = 8.75;
                break;
            case 'MB':
                value = 6.25;
                break;
            case 'B':
                value = 3.75;
                break;
            case 'R':
                value = 1.25;
                break;
        }

        return value;
    };
}