"use strict";

export function WordsShorterFilter() {
    return function (value) {
        if(!value){ return value; }

        let words = value.split(' ');

        words = words.map(word => {
            if(word.length > 5){
                word = word.slice(0, 5) + '.';
            }

            return word;
        });

        return words.join(' ');
    };
}