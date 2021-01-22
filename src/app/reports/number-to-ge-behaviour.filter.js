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

export function BehaviourToGeNumberFilter() {
    return function (value) {
        switch(value) {
            case 'DA':
                value = 9.5;
                break;
            case 'AA':
                value = 8;
                break;
            case 'PA':
                value = 6;
                break;
            case 'NA':
                value = 2.5;
                break;
        }

        return value;
    };
}