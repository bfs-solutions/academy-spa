
'use strict';

export class EnrollmentGradesCalculator {

    constructor(enrollment){
        this.enrollment = enrollment;
    }

    calculate(subjects, halfIdx = null, partialIdx = null, componentIdx = null, includeQualitative = false){
        const result = {
            grade: '#',
            halves: [],
            subjects: {}
        };

        return new Promise((resolve, reject) => {
            this.enrollment.grades.subscribe(grades => {

                if (!grades) { return; }

                subjects.subscribe((subjects) => {
                    if (!subjects) { return; }

                    Promise.all(subjects.map((subject) => {
                        return subject.gradesCalculator.calculate(grades, halfIdx, partialIdx, componentIdx);
                    })).then((subjectsGrades) => {

                        subjects.forEach((subject, i) => {
                            result.subjects[subject.id] = subjectsGrades[i];
                        });

                        // filter subjects for aggregated result calculations
                        subjects = subjects.filter((s) => includeQualitative || !s.qualitative);

                        const halves = Math.max(...subjects.map((s) => result.subjects[s.id].halves.length));

                        for(let i = 0; i < halves; i++){
                            result.halves.push(EnrollmentGradesCalculator.calculateHalf(
                                result, subjects, i
                            ));
                        }

                        result.grade = subjects.map((s) => result.subjects[s.id].grade)
                                .reduce((a, b) => a + b, 0) / subjects.length;

                        resolve(result);
                    })
                }, (err) => reject(err));
            }, (err) => reject(err));
        });
    }

    static calculateHalf(raw, subjects, i){
        const result  = {
            grade: '#',
            partials: []
        };

        const grades = subjects.map((subject) => raw.subjects[subject.id].halves[i].grade);

        if(grades.every((grade) => grade !== '#')){
            result.grade = grades.reduce((a, b) => a + b, 0) / grades.length;
        }

        const partials = Math.max(...subjects.map(
            (s) => raw.subjects[s.id].halves[i].partials ? raw.subjects[s.id].halves[i].partials.length : 0
        ));

        for(let j = 0; j < partials; j++){
            result.partials.push(EnrollmentGradesCalculator.calculatePartial(
                raw, subjects, i, j
            ));
        }

        return result;
    }

    static calculatePartial(raw, subjects, i, j){
        const result  = {
            grade: '#'
        };

        const grades = subjects
            .map((subject) => raw.subjects[subject.id].halves[i].partials[j].grade);

        if(grades.every((grade) => grade !== '#')){
            result.grade = grades.reduce((a, b) => a + b, 0) / grades.length;
        }

        return result;
    }
}