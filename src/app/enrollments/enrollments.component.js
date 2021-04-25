"use strict";

import enrollmentsComponentTemplate from "./enrollments.component.html";

export class EnrollmentsComponentController {

    static $inject = ['$scope', 'courses'];

    constructor($scope, courses) {
        
        $scope.courses = courses;
    }
}

export default {
    controller: EnrollmentsComponentController,
    template: enrollmentsComponentTemplate
};