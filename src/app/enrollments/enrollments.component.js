"use strict";

import enrollmentsComponentTemplate from "./enrollments.component.html";

export class EnrollmentsComponentController {

    constructor($scope, courses) {
        "ngInject";

        $scope.courses = courses;
    }
}

export default {
    controller: EnrollmentsComponentController,
    template: enrollmentsComponentTemplate
};