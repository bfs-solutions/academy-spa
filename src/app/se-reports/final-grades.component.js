
'use strict';

import finalGradesTemplate from "./final-grades.component.html";

class FinalGradesController {

    constructor($scope) {
        'ngInject';

        this.loading = true;

        this.$scope = $scope;
    }

    $onInit() {

        // this.subjects = this.course.selectedSubjects.getValue();

        this.group.enrollments.subscribe((enrollments) => {

            if(!enrollments) { return; }

            Promise.all(enrollments.map((enrollment) => {
                return enrollment.gradesCalculator.calculate(
                    (this.course.selectedSubjects || this.course.subjects));
            })).then((results) => {
                enrollments.forEach((enrollment, i) => {
                    enrollment.gradesObj = results[i];
                });

                this.enrollments = enrollments;

                // console.log(enrollments, results);

                this.loading = false;
                this.$scope.$applyAsync();
            }, () => {
                this.loading = false;
                this.$scope.$applyAsync();
            });

        }, () => {
            this.loading = false;
            this.$scope.$applyAsync();
        });
    }
}

export const FinalGradesComponent = {
    controller: FinalGradesController,
    template: finalGradesTemplate,
    bindings: {
        course: '<',
        edition: '<',
        group: '<',
        includeTeachers: '<'
    }
};