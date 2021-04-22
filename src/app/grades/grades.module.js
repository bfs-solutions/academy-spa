"use strict";

import angular from "angular";
import 'angular1-async-filter';

import sharedModule from "../shared/shared.module.ajs";
import {GradesMeanFilter} from "./grades-mean.filter";
import gradesComponent from "./grades.component";
import * as gradesQualitative from "./grades-qualitative.component";
import gradesSelectComponent from "./grades-select.component";
import {NumberToGeBehaviourFilter} from "./number-to-ge-behaviour.filter";

export default angular.module("smart-academy-grades", [
    "asyncFilter", sharedModule.name
])

    .filter('gradesMean', GradesMeanFilter)
    .filter("numberToGeBehaviour", NumberToGeBehaviourFilter)

    .component("saGrades", gradesComponent)
    .component("saGradesQualitative", gradesQualitative.GradesQualitativeComponent)
    .component("saGradesSelect", gradesSelectComponent)

    .config(['$routeProvider', function ($routeProvider) {
        
        $routeProvider
            .when('/grades', {
                template: '<sa-grades-select></sa-grades-select>'
            })

            .when('/grades/:group/:subject', {
                template: '<sa-grades></sa-grades>'
            })

            .when('/grades-qualitative/:group/:subject', {
                template: '<sa-grades-qualitative></sa-grades-qualitative>'
            });
    }]);