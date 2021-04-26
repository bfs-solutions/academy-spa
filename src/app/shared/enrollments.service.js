"use strict";

import { environment } from "../../environments/environment";
import { CollectionService } from "./collection.service";
import { StudentsService } from "./students.service";

import * as enrollmentGradesCalculator
    from "./enrollment-grades-calculator";

export class EnrollmentsService extends CollectionService {

    static $inject = ['$http'];

    constructor($http) {

        const path = arguments[1] || (new URL(
            '/enrollments',
            environment.academyApi
        )).toString();

        super($http, "enrollments", path);
    }

    mapResource(resource) {

        (new StudentsService(this.$http)).retrieveResource(resource.student).then(
            student => resource.studentObj = student
        );

        resource.grades = new CollectionService(this.$http,
            "grades",
            (new URL(
                resource._links['enrollment-has-grades'].href,
                this.path
            )).toString());

        resource.gradesCalculator =
            new enrollmentGradesCalculator.EnrollmentGradesCalculator(resource);

        return resource;
    }
}