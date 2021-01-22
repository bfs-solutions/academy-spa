"use strict";

import newCourseComponentTemplate from "./new-course.component.html";

class NewCourseComponentController {

    constructor($scope, $location, courses) {
        "ngInject";

        $scope.courses = courses;

        this.$scope = $scope;
        this.$location = $location;
        this.courses = courses;
    }

    submit(form) {

        this.$scope.$broadcast('show-errors-check-validity');

        if (!this.$scope.newCourseForm.$valid) return;

        let course = {
            label: form.label
        };

        if (form.promote_to) {
            course.promote_to = form.promote_to.id;
        }

        this.courses.addResource(course).then(
            (res) => {
                if (200 > res.status || res.status > 299) {
                    this.$scope.error = `${res.statusText}: ${res.data.toString()}`;
                    return;
                }

                this.$location.path("/courses");
            },
            (err) => this.$scope.error = err
        );
    }
}

export default {
    controller: NewCourseComponentController,
    template: newCourseComponentTemplate
};