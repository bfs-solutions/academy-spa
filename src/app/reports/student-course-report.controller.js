"use strict";

export class StudentCourseReportController {

    static $inject = ['$scope'];

    constructor($scope) {
        
        this.loading = true;

        this.$scope = $scope;
    }

    $onInit() {

        this.enrollment.gradesCalculator.calculate(
            (this.course.selectedSubjects || this.course.subjects),
            this.halfIdx,
            this.partialIdx).then(grades => {
            // console.log(grades);
            this.grades = grades;
            this.loading = false;
            this.$scope.$applyAsync();
        }, () => {
            this.loading = false;
            this.$scope.$applyAsync();
        });
    }
}