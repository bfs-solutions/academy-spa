"use strict";

const DESCRIPTIONS = {
    A: "Lidera el cumplimiento de los compromisos establecidos para la sana convivencia social.",
    B: "Cumple con los compromisos establecidos para la sana convivencia social.",
    C: "Falla ocasionalmente en el cumplimiento de los compromisos establecidos para la sana convivencia social.",
    D: "Falla reiteradamente en el cumplimiento de los compromisos establecidos para la sana convivencia social",
    E: "No cumple con los compromisos establecidos para la sana convivencia social.",
    Excelente: "Demuestra destacado desempeño en cada fase del desarrollo del proyecto escolar lo que constituye un excelente aporte a su formación integral.",
    "Muy Buena": "Demuestra muy buen desempeño en cada fase del desarrollo del proyecto escolar lo que constituye un aporte a su formación integral.",
    "Buena": "Demuestra buen desempeño en casa fase del desarrollo del proyecto escolar lo que contribuye a su formación integral.",
    "Regular": "Demuestra regular desempeño en casa fase del desarrollo del proyecto escolar lo que contribuye escasamente a su formación integral."
};

export function BehaviourToWordsFilter() {
    return function (value) {
        if (DESCRIPTIONS[value]) {
            return DESCRIPTIONS[value];
        }
        return value;
    };
}