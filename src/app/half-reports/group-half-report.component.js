'use strict';

import groupHalfReportTemplate from "./group-half-report.component.html";

class GroupHalfReportController {

    constructor($scope, gradesCalculator) {
        'ngInject';

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

    getSubjectGrade(enrollments, subjectId, halfIdx){
        if(!enrollments){ return; }

        let filteredEnrollments = enrollments.filter(
            e => e.grades && e.grades.subjects && e.grades.subjects[subjectId] && e.grades.subjects[subjectId][halfIdx].grade !== '#'
        );

        return filteredEnrollments
                .map(e => e.grades.subjects[subjectId][halfIdx].grade)
                .reduce((a, b) => a + b, 0) / filteredEnrollments.length;
    }

}

export const GroupHalfReportComponent = {
    controller: GroupHalfReportController,
    template: groupHalfReportTemplate,
    bindings: {
        course: '<',
        edition: '<',
        group: '<',
        halfIdx: '<',
        includeMeans: '<',
        includeTeachers: '<'
    }
};
