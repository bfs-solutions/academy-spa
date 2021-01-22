"use strict";

export function NumberToBehaviourFilter() {
    return function (value) {
        if (value >= 9 && value <= 10) {
            value = 'A'
        }
        else if (value >= 7 && value <= 8.99) {
            value = 'B'
        }
        else if (value >= 5 && value <= 6.99) {
            value = 'C'
        }
        else if (value >= 4 && value <= 4.99) {
            value = 'D'
        }
        else if (value >= 0 && value < 4) {
            value = 'E'
        }
        else { value = ''; }

        return value;
    };
}

export function BehaviourToNumberFilter() {
    return function (value) {
        switch(value) {
            case 'A':
                value = 9.5;
                break;
            case 'B':
                value = 8;
                break;
            case 'C':
                value = 6;
                break;
            case 'D':
                value = 4.5;
                break;
            case 'E':
                value = 2;
                break;
        }

        return value;
    };
}