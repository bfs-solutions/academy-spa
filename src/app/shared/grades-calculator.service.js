'use strict';

export class GradesCalculatorService {

    getGrades(enrollment, course, halfIdx, partialIdx, subject, includeQualitative=false) {

        let result = {
            all: [],
            subjects: {},
            halves: {}
        };

        return new Promise((resolve, reject) => {

            enrollment.grades.subscribe(grades => {

                if (!grades) {
                    return;
                }

                result.all = grades;

                this.retrieveSubjects(course, halfIdx, partialIdx, subject, result, includeQualitative).then(() => {

                    resolve(result);
                }, (err) => reject(err));
            });
        });
    }

    retrieveSubjects(course, halfIdx, partialIdx, subject, result, includeQualitative=false) {
        return new Promise((resolve, reject) => {

            (course.selectedSubjects || course.subjects).subscribe(subjects => {

                if (!subjects) {
                    return;
                }

                if(subject){
                    subjects = subjects.filter(s => s.id === subject.id);
                }

                if (subjects.length === 0) {
                    return;
                }

                subjects.forEach(subject => {
                    result.subjects[subject.id] = [];
                });

                Promise.all(subjects.map(s => this.retrieveHalves(s, halfIdx, partialIdx, result)))
                    .then(() => {

                        result.subjects[subjects[0].id].forEach((h, i) => {

                            let s = subjects.filter(
                                s => (includeQualitative || !s.qualitative) && result.subjects[s.id][i].grade !== '#'
                            );

                            if (result.halves[i]) {
                                return;
                            }

                            result.halves[i] = {grade: 0, partials: {}};

                            result.halves[i].grade = s
                                    // .filter(s => !s.qualitative)
                                    .map(s => result.subjects[s.id][i].grade)
                                    .reduce((a, b) => a + b, 0) / s.length;

                            result.subjects[s[0].id][i].partials.forEach((p, j) => {
                                if (result.halves[i].partials[j]) {
                                    return;
                                }

                                result.halves[i].partials[j] = {grade: 0};

                                result.halves[i].partials[j].grade = s
                                        // .filter(s => !s.qualitative)
                                        .map(s => result.subjects[s.id][i].partials[j].grade)
                                        .reduce((a, b) => a + b, 0) / s.length;
                            });
                        });

                        resolve();
                    }, err => reject(err));
            }, err => reject(err));
        });
    }

    retrieveHalves(subject, halfIdx, partialIdx, result) {

        return new Promise((resolve, reject) => {

            subject.halves.subscribe(halves => {

                if (!halves || halves.length === 0) {
                    return;
                }

                if (halfIdx)
                    halves = halves.filter((h, i) => i <= halfIdx);

                halves.forEach(
                    h => result.subjects[subject.id].push({
                        grade: 0,
                        partials: []
                    })
                );

                Promise.all(halves.map((h, i) => this.retrievePartials(subject, h, i, halfIdx, partialIdx, result)))
                    .then(() => resolve(), err => reject(err));
            }, err => reject(err));
        });
    }

    retrievePartials(subject, half, i, halfIdx, partialIdx, result) {

        return new Promise((resolve, reject) => {

            half.partials.subscribe(partials => {

                if (!partials || partials.length === 0) {
                    return;
                }

                if (i >= halfIdx && partialIdx) {
                    partials = partials.filter((p, j) => j <= partialIdx);
                }

                partials.forEach(
                    p => result.subjects[subject.id][i].partials.push({
                        grade: 0, components: []
                    })
                );

                Promise.all(partials.map((p, j) =>
                    this.retrieveComponents(subject, i, p, j, result)))
                    .then(() => {

                        let half = result.subjects[subject.id][i];

                        let partials80 = half.partials.slice(0, -1),
                            partials20 = half.partials.slice(-1);

                        if(partials80.some(p => p.grade === '#') || partials20.some(p => p.grade === '#')){
                            half.grade80 = '#';

                            half.grade20 = '#';

                            half.grade = (half.grade80 * 0.8) + (half.grade20 * 0.2);
                        }else{
                            half.grade80 = partials80.map(p => p.grade)
                                    .reduce((a, b) => a + b, 0) / partials80.length;

                            half.grade20 = partials20[0].grade;

                            half.grade = (half.grade80 * 0.8) + (half.grade20 * 0.2);
                        }

                        resolve();
                    }, err => reject(err));
            }, err => reject(err));
        });
    }

    retrieveComponents(subject, i, partial, j, result) {

        return new Promise((resolve, reject) => {

            partial.components.subscribe(components => {

                if (!components || components.length === 0) {
                    return;
                }

                components.forEach(
                    p => result.subjects[subject.id][i].partials[j].components.push({
                        grade: 0
                    })
                );

                Promise.all(components.map((c, k) =>
                    this.retrieveEvaluations(subject, i, j, c, k, result)))
                    .then(() => {

                        let components = result.subjects[subject.id][i].partials[j]
                            .components;

                        if(components.some(c => c.grade === '#')){
                            result.subjects[subject.id][i].partials[j].grade = '#';
                        }else{
                            result.subjects[subject.id][i].partials[j].grade =
                                components.map(c => c.grade)
                                    .reduce((a, b) => a + b, 0) / components.length;
                        }

                        resolve();
                    }, err => reject(err));
            }, err => reject(err));
        });
    }

    retrieveEvaluations(subject, i, j, component, k, result) {

		result.subjects[subject.id][i].partials[j].components[k].grade =
            (result.all.find(g => g.component === component.id) || {value: '#'}).value;

        return Promise.resolve();
    }
}