"use strict";

export function NumberToGeBehaviourFilter() {
    return function (value) {
        if (value >= 9) {
            value = 'DA'
        }
        if (value >= 7 && value <= 8.99) {
            value = 'AA'
        }
        if (value >= 5 && value <= 6.99) {
            value = 'PA'
        }
        if (value < 4.99) {
            value = 'NA'
        }

        return value;
    };
}