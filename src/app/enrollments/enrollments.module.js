"use strict";

import sharedModule from "../shared/shared.module";
import enrollmentsComponent from "./enrollments.component";
import enrollmentListComponent from "./enrollment-list.component";
import groupEnrollmentsComponent from "./group-enrollments.component";
import enrollUnregisteredStudentComponent from "./enroll-unregistered-student.component";
import enrollRegisteredStudentComponent from "./enroll-registered-student.component";
import * as deleteEnrollment from './delete-enrollment.component';
import * as editEnrollment from './edit-enrollment.component';

export default angular.module("smart-academy-enrollments", [
    "ngRoute", "asyncFilter", "mgo-angular-wizard", 'ngFileSaver',
    sharedModule.name
])

    .component("saEnrollments", enrollmentsComponent)
    .component("saEnrollmentList", enrollmentListComponent)
    .component("saGroupEnrollments", groupEnrollmentsComponent)
    .component("saEnrollUnregisteredStudent", enrollUnregisteredStudentComponent)
    .component("saEnrollRegisteredStudent", enrollRegisteredStudentComponent)
    .component('saDeleteEnrollment', deleteEnrollment.DeleteEnrollmentComponent)
    .component('saEditEnrollment', editEnrollment.EditEnrollmentComponent)

    .config(function ($routeProvider) {
        "ngInject";

        $routeProvider
            .when('/enrollments', {
                template: '<sa-enrollments></sa-enrollments>'
            })

            .when('/courses/:course/editions/:edition/groups/:group/enrollments', {
                template: '<sa-group-enrollments></sa-group-enrollments>'
            })

            .when('/courses/:course/editions/:edition/groups/:group/enrollments/_new', {
                template: '<sa-enroll-unregistered-student></sa-enroll-unregistered-student>'
            })

            .when('/courses/:course/editions/:edition/groups/:group/enrollments/_existing', {
                template: '<sa-enroll-registered-student></sa-enroll-registered-student>'
            });
    });