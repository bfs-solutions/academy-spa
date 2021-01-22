"use strict";

import sharedModule from "../shared/shared.module";
import fixturesModule from "../fixtures/fixtures.module";

import coursesComponent from "./courses.component";
import subjectsComponent from "./subjects.component";
import newCourseComponent from "./new-course.component";
import newSubjectComponent from "./new-subject.component";

export default angular.module("smart-academy-courses", [
    "ngRoute", "asyncFilter", sharedModule.name, fixturesModule.name
])

    .component("saCourses", coursesComponent)
    .component("saSubjects", subjectsComponent)
    .component("saNewCourse", newCourseComponent)
    .component("saNewSubject", newSubjectComponent)

    .config(function ($routeProvider) {
        "ngInject";

        $routeProvider
            .when('/courses', {
                template: '<sa-courses></sa-courses>'
            })

            .when('/courses/_new', {
                template: '<sa-new-course></sa-new-course>'
            })

            .when('/courses/:course/subjects', {
                template: '<sa-subjects></sa-subjects>'
            })

            .when('/courses/:course/subjects/_new', {
                template: '<sa-new-subject></sa-new-subject>'
            });
    });