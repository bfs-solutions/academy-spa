
'use strict';

/** Calculate the grade for every element of subject structure from raw info
 */
export class SubjectGradesCalculator {

    /** Constructor.
     *
     * @param {Subject} subject The subject structure
     */
    constructor(subject){
        this.subject = subject;
    }

    /** Calculate grade structure for subject from raw data
     *
     * @param {Object} raw Raw grade data as retrieved for enrollment
     * @param {Number} halfIdx Index of half to stop calculating
     * @param {Number} partialIdx Index of partial to stop calculating
     * @param {Number} componentIdx Index of components to stop calculating
     * @return Promise<Object> Structured grade data
     */
    calculate(raw, halfIdx = null, partialIdx = null, componentIdx = null){

        const result = {
            grade: '#',
            qGrade: '#',
            sGrade: '#',
            halves: []
        };

        return new Promise((resolve, reject) => {

            this.subject.halves.subscribe((halves) => {
                // wait for next value if current is invalid
                if(!halves){ return; }

                // create a half grade structure for every half
                result.halves = halves.map(() => { return { grade: '#' }; });

                // restrict further calculation up to halfIdx
                if (halfIdx){
                    halves = halves.filter((_, i) => i <= halfIdx);
                }

                // calculate grade structure for every half
                Promise.all(halves.map((half, i) => {
                    if(!this.subject.qualitative && !halfIdx && i === halves.length - 1){
                        return SubjectGradesCalculator.calculateLastQuantitativeHalf(
                            half,
                            raw,
                            componentIdx
                        );
                    }else{
                        return SubjectGradesCalculator.calculateHalf(
                            half,
                            raw,
                            // partialIdx is only passed for the last half
                            partialIdx && i === halves.length - 1 ? partialIdx : null
                        );
                    }
                })).then((halvesGrades) => {

                    // replace default grade for halves using halvesGrades
                    Array.prototype.splice.apply(result.halves,
                        [0, halvesGrades.length].concat(halvesGrades));

                    // calculate subject grade
                    if(!this.subject.qualitative &&
                            result.halves.slice(0, -1).every((h) => h.grade !== '#')){
                        result.qGrade = result.halves.slice(0, -1)
                                .map((h) => h.grade)
                                .reduce((a, b) => a + b, 0) / (result.halves.length - 1);
                        result.sGrade = result.halves[result.halves.length - 1].grade;

                        result.grade = Math.max(
                            result.qGrade,
                            result.sGrade !== '#' ? (result.sGrade > 7 ? 7 : result.sGrade) : 0
                        );
                    }else if(result.halves.every((h) => h.grade !== '#')){
                        result.grade = result.halves.map((h) => h.grade)
                                .reduce((a, b) => a + b, 0) / result.halves.length;
                        result.qGrade = result.grade;
                    }


                    resolve(result);

                }, (err) => reject(err));
            }, (err) => reject(err));
        });
    }

    /** Calculate grade structure for half from raw data
     *
     * @param {Object} half The half structure
     * @param {Object} raw Raw grade data as retrieved for enrollment
     * @param {Number} partialIdx Index of partial to stop calculating
     * @return Promise<Object> Structured grade data
     */
    static calculateHalf(half, raw, partialIdx = null){

        const result = {
            grade: '#',
            grade80: '#',
            grade20: '#',
            partials: []
        };

        return new Promise((resolve, reject) => {

            half.partials.subscribe((partials) => {
                // wait for next value if current is invalid
                if(!partials){ return; }

                // create a partial grade structure for every partial
                result.partials = partials.map(() => { return { grade: '#' }; });

                // restrict further calculation up to partialIdx
                if (partialIdx){
                    partials = partials.filter((_, i) => i <= partialIdx);
                }

                // calculate grade structure for every partial
                Promise.all(partials.map((partial) => {
                    return SubjectGradesCalculator.calculatePartial(partial, raw)
                })).then((partialsGrades) => {

                    // replace default grade for partials using partialsGrades
                    Array.prototype.splice.apply(result.partials,
                        [0, partialsGrades.length].concat(partialsGrades));

                    // calculate half grade
                    if(result.partials.every((p) => p.grade !== '#')){
                        result.grade80 = result.partials.slice(0, -1).map((p) => p.grade)
                                .reduce((a, b) => a + b, 0) / (result.partials.length - 1);
                        result.grade20 = result.partials[result.partials.length - 1].grade;
                        result.grade = (result.grade80 * 0.8) + (result.grade20 * 0.2);
                    }

                    resolve(result);

                }, (err) => reject(err));
            }, (err) => reject(err));
        });
    }

    /** Calculate grade structure for half from raw data
     *
     * @param {Object} half The half structure
     * @param {Object} raw Raw grade data as retrieved for enrollment
     * @param {Number} partialIdx Index of partial to stop calculating
     * @return Promise<Object> Structured grade data
     */
    static calculateLastQuantitativeHalf(half, raw, componentIdx){

        const result = {
            grade: '#',
            partials: []
        };

        return new Promise((resolve, reject) => {

            half.partials.subscribe((partials) => {
                // wait for next value if current is invalid
                if(!partials){ return; }

                // create a partial grade structure for every partial
                result.partials = partials.map(() => { return { grade: '#' }; });

                // calculate grade structure for every partial
                Promise.all(partials.map((partial) => {
                    return SubjectGradesCalculator.calculateLastQuantitativeHalfPartial(partial, raw, componentIdx)
                })).then((partialsGrades) => {

                    // replace default grade for partials using partialsGrades
                    Array.prototype.splice.apply(result.partials,
                        [0, partialsGrades.length].concat(partialsGrades));

                    // calculate half grade
                    if(result.partials.every((p) => p.grade !== '#')){
                        result.grade = result.partials.map((p) => p.grade)
                                .reduce((a, b) => a + b, 0) / result.partials.length;
                    }

                    resolve(result);

                }, (err) => reject(err));
            }, (err) => reject(err));
        });
    }

    /** Calculate grade structure for partial from raw data
     *
     * @param {Object} partial The partial structure
     * @param {Object} raw Raw grade data as retrieved for enrollment
     * @return Promise<Object> Structured grade data
     */
    static calculatePartial(partial, raw){
        const result = {
            grade: '#',
            components: []
        };

        return new Promise((resolve, reject) => {

            partial.components.subscribe((components) => {
                // wait for next value if current is invalid
                if(!components){ return; }

                // create a component grade structure for every component
                result.components = components.map(() => { return { grade: '#' }; });

                // calculate grade structure for every component
                Promise.all(components.map((component) => {
                    return SubjectGradesCalculator.calculateComponent(component, raw)
                })).then((componentsGrades) => {

                    // replace default grade for partials using partialsGrades
                    Array.prototype.splice.apply(result.components,
                        [0, componentsGrades.length].concat(componentsGrades));

                    // calculate partial grade
                    if(result.components.every((c) => c.grade !== '#')){
                        result.grade =
                            result.components.map((c) => c.grade)
                                .reduce((a, b) => a + b, 0) / result.components.length;
                    }

                    resolve(result);

                }, (err) => reject(err));
            }, (err) => reject(err));
        });
    }

    /** Calculate grade structure for partial from raw data
     *
     * @param {Object} partial The partial structure
     * @param {Object} raw Raw grade data as retrieved for enrollment
     * @return Promise<Object> Structured grade data
     */
    static calculateLastQuantitativeHalfPartial(partial, raw, componentIdx){
        const result = {
            grade: '#',
            components: []
        };

        return new Promise((resolve, reject) => {

            partial.components.subscribe((components) => {
                // wait for next value if current is invalid
                if(!components){ return; }

                // create a component grade structure for every component
                result.components = components.map(() => { return { grade: '#' }; });

                // calculate grade structure for every component
                Promise.all(components.map((component) => {
                    return SubjectGradesCalculator.calculateComponent(component, raw)
                })).then((componentsGrades) => {

                    // replace default grade for partials using partialsGrades
                    Array.prototype.splice.apply(result.components,
                        [0, componentsGrades.length].concat(componentsGrades));

                    let components = result.components;


                    if(componentIdx !== null && componentIdx !== undefined){
                        components = components.slice(0, componentIdx);
                    }

                    // calculate partial grade
                    if(components.some((c) => c.grade !== '#')){
                        result.grade = Math.max(
                            ...components.map((c) => c.grade)
                                .filter((g) => g !== '#')
                        );
                    }

                    resolve(result);

                }, (err) => reject(err));
            }, (err) => reject(err));
        });
    }

    static calculateComponent(component, raw){
		const grade = raw.find((grade) => grade.component === component.id);

        const result = {
            grade: grade ? grade.value : '#'
        };

        return Promise.resolve(result);
    }
}