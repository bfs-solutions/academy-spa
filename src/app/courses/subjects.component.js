"use strict";

import subjectsComponentTemplate from "./subjects.component.html";

class SubjectsComponentController {

    constructor($scope, $routeParams, courses) {
        "ngInject";

        let courseId = parseInt($routeParams.course);

        courses.subscribe(courses => {

            if (!courses) return;

            $scope.course = courses.find(c => c.id === courseId);
        });
    }
}

export default {
    controller: SubjectsComponentController,
    template: subjectsComponentTemplate
};