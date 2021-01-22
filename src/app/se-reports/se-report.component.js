
'use strict';

import seReportTemplate from "./se-report.component.html";

class SeReportController {

    constructor($scope) {
        'ngInject';

        this.loading = true;

        this.$scope = $scope;
    }

    $onInit() {

        this.subjects = this.course.selectedSubjects.getValue().filter((s) => {
            return !s.qualitative;
        });

        this.group.enrollments.subscribe((enrollments) => {

            if(!enrollments) { return; }

            Promise.all(enrollments.map((enrollment) => {
                return enrollment.gradesCalculator.calculate(
                    (this.course.selectedSubjects || this.course.subjects),
                    null, null, this.componentIdx);
            })).then((results) => {
                enrollments.forEach((enrollment, i) => {
                    enrollment.gradesObj = results[i];
                });

                this.enrollments = enrollments.filter((e) => {
                    return this.subjects.some((s) => {
                        return e.gradesObj.subjects[s.id].qGrade < 7
                    });
                });

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

export const SeReportComponent = {
    controller: SeReportController,
    template: seReportTemplate,
    bindings: {
        course: '<',
        edition: '<',
        group: '<',
        includeTeachers: '<',
        component: '<',
        componentIdx: '<'
    }
};