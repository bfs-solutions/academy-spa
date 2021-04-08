
'use strict';

import groupPartialReportTemplate from './group-partial-report.component.html';

class GroupPartialReportController {

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
                    this.halfIdx, this.partialIdx)))
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

    getSubjectGrade(enrollments, subjectId, halfIdx, partialIdx){
        if(!enrollments){ return; }

        let filteredEnrollments = enrollments.filter(
            e => e.grades && e.grades.subjects && e.grades.subjects[subjectId] && e.grades.subjects[subjectId][halfIdx].partials[partialIdx].grade !== '#'
        );

        return filteredEnrollments
                .map(e => e.grades.subjects[subjectId][halfIdx].partials[partialIdx].grade)
                .reduce((a, b) => a + b, 0) / filteredEnrollments.length;
    }

}

export const GroupPartialReportComponent = {
    controller: GroupPartialReportController,
    template: groupPartialReportTemplate,
    bindings: {
        course: '<',
        edition: '<',
        group: '<',
        halfIdx: '<',
        partialIdx: '<',
        includeMeans: '<',
        includeTeachers: '<'
    }
};