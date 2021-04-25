"use strict";

import angular from "angular";
import AngularRouteModule from 'angular-route';
import 'angular1-async-filter';
import 'angular-bootstrap-show-errors';

import sharedModule from "../shared/shared.module.ajs";
import fixturesModule from "../fixtures/fixtures.module.ajs";

import coursesComponent from "./courses.component";
import subjectsComponent from "./subjects.component";
import newCourseComponent from "./new-course.component";
import newSubjectComponent from "./new-subject.component";

export default angular.module("smart-academy-courses", [
    AngularRouteModule, 
    "asyncFilter", 
    
    sharedModule.name, 
    fixturesModule.name
])

    .component("saCourses", coursesComponent)
    .component("saSubjects", subjectsComponent)
    .component("saNewCourse", newCourseComponent)
    .component("saNewSubject", newSubjectComponent)

    .config(['$routeProvider', function ($routeProvider) {
        
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
    }]);