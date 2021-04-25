"use strict";

import {CollectionService} from "./collection.service";
import {StudentsService} from "./students.service";

import * as enrollmentGradesCalculator
    from "./enrollment-grades-calculator";

export class EnrollmentsService extends CollectionService {

    static $inject = ['$http'];

    constructor($http) {
        
        super($http, "enrollments", arguments[1]);
    }

    mapResource(resource) {

        (new StudentsService(this.$http)).retrieveResource(resource.student).then(
            student => resource.studentObj = student
        );

        resource.grades = new CollectionService(this.$http,
            "grades",
            resource._links['enrollment-has-grades'].href);

        resource.gradesCalculator =
            new enrollmentGradesCalculator.EnrollmentGradesCalculator(resource);

        return resource;
    }
}