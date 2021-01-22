"use strict";

import newEditionComponentTemplate from "./new-edition.component.html";

class NewEditionComponentController {

    constructor($scope, $routeParams, $location, courses) {
        "ngInject";

        let courseId = parseInt($routeParams.course);

        $scope.form = {
            date_start: new Date(),
            date_end: new Date()
        };

        $scope.form.date_end.setFullYear($scope.form.date_end.getFullYear() + 1);

        courses.subscribe(courses => {
            if (!courses) return;

            $scope.course = courses.find(c => c.id === courseId);
        }, (err) => $scope.error = err);

        this.$scope = $scope;
        this.$location = $location;
    }

    submit(form) {

        this.$scope.$broadcast('show-errors-check-validity');

        if (!this.$scope.newEditionForm.$valid) return;

        // TODO: check edition ranges do not overlap

        this.$scope.course.editions.addResource(form).then(
            (res) => {
                if (200 > res.status || res.status > 299) {
                    this.$scope.error = `${res.statusText}: ${res.data.toString()}`;
                    return;
                }

                this.$location.path(`/courses/${this.$scope.course.id}/editions`);
            },
            (err) => this.$scope.error = err
        );
    }
}

export default {
    controller: NewEditionComponentController,
    template: newEditionComponentTemplate
}