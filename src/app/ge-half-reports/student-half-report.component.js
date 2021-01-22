'use strict';

import studentHalfReportTemplate from "./student-half-report.component.html";

class StudentHalfReportController {

    constructor($scope, gradesCalculator) {
        'ngInject';

        this.loading = true;

        this.$scope = $scope;
        this.gradesCalculator = gradesCalculator;
    }

    $onInit() {

        this.gradesCalculator.getGrades(this.enrollment, this.course,
            this.halfIdx, this.partialIdx, null, true).then(grades => {
            this.grades = grades;
            this.loading = false;
            this.$scope.$applyAsync();
        }, (err) => {
            this.loading = false;
            this.$scope.$applyAsync();
        });
    }

}

export const StudentHalfReportComponent = {
    controller: StudentHalfReportController,
    template: studentHalfReportTemplate,
    bindings: {
        course: '<',
        edition: '<',
        group: '<',
        halfIdx: '<',
        enrollment: '<',
        includeMeans: '<'
    }
};
