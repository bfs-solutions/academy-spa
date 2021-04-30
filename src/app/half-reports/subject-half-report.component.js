'use strict';

import subjectHalfReportTemplate from "./subject-half-report.component.html";

class SubjectHalfReportController {

    static $inject = ['$scope', 'gradesCalculator'];

    constructor($scope, gradesCalculator) {
        this.loading = true;

        this.$scope = $scope;
        this.gradesCalculator = gradesCalculator;
    }

    $onInit() {

        this.group.enrollments.subscribe(enrollments => {
            if (!enrollments) {
                return;
            }

            Promise.all(enrollments.map(e =>
                this.gradesCalculator.getGrades(e, this.course,
                    this.halfIdx, this.partialIdx, this.subject)))
                .then(results => {
                    results.forEach((result, i) => enrollments[i].grades = result);
                    this.loading = false;
                    this.$scope.$applyAsync();
                }, (err) => {
                    this.loading = false;
                    this.$scope.$applyAsync();
                })
        });
    }

    getSubjectGrade(enrollments, subjectId, halfIdx){
        // console.log('getSubjectGrade', enrollments, subjectId, halfIdx);

        if(!enrollments){ return; }

        return enrollments
            .map(e => e.grades.subjects[subjectId][halfIdx].grade)
            .reduce((a, b) => a + b, 0)
            / enrollments.length;
    }

    getSubjectGradePartial(enrollments, subjectId, halfIdx, partialIdx){
        // console.log('getSubjectGradePartial', enrollments, subjectId, halfIdx, partialIdx);

        if(!enrollments){ return; }

        return enrollments
                .map(e => e.grades.subjects[subjectId][halfIdx].partials[partialIdx].grade)
                .reduce((a, b) => a + b, 0)
            / enrollments.length;
    }

}

export const SubjectHalfReportComponent = {
    controller: SubjectHalfReportController,
    template: subjectHalfReportTemplate,
    bindings: {
        course: '<',
        edition: '<',
        group: '<',
        halfIdx: '<',
        subject: '<'
    }
};
