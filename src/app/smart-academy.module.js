/* Smart Academy client entry point */

"use strict";

import angular from "angular";
import AngularRouteModule from 'angular-route';
import AngularUIBootstrapModule from 'ui-bootstrap4';
import 'angular1-async-filter';
import { $locationShim } from '@angular/common/upgrade';
import { downgradeInjectable } from '@angular/upgrade/static';

import { AppComponent } from './app.component';
import dashboardComponent from "./dashboard.component";

import usersModule from "./users/users.module";
import institutionsModule from "./institutions/institutions.module.ajs";
import securityModule from "./security/security.module";
import coursesModel from "./courses/courses.module";
import enrollmentsModule from "./enrollments/enrollments.module";
import reportsModule from "./reports/reports.module";
import gradesModule from "./grades/grades.module";
import editionsModule from "./editions/editions.module";
import teachingsModule from "./teachings/teachings.module.ajs";
import enrollmentReportsModule from "./enrollment-reports/enrollment-reports.module";
import partialReports from "./partial-reports/partial-reports.module";
import halfReports from "./half-reports/half-reports.module";
import fixtureModule from "./fixtures/fixtures.module.ajs";
import geHalfReports from "./ge-half-reports/ge-half-reports.module";
import studentsModule from "./students/students.module";
import reportsEnrollments from './reports-enrollments/reports-enrollments.module';
import gradesTemplates from './grades-templates/grades-templates.module';
import seReports from "./se-reports/se-reports.module";

export const SmartAcademyModule = angular.module("smart-academy", [
    AngularUIBootstrapModule, 
    AngularRouteModule, 
    'asyncFilter', 
    
    institutionsModule.name,
    usersModule.name, 
    coursesModel.name, 
    securityModule.name,
    enrollmentsModule.name, 
    reportsModule.name, 
    gradesModule.name,
    editionsModule.name, 
    teachingsModule.name, 
    enrollmentReportsModule.name,

    partialReports.name,
    halfReports.name,

    fixtureModule.name,

    geHalfReports.name,

    studentsModule.name,

    reportsEnrollments.name,

    gradesTemplates.name,

    seReports.name
])
    .factory('$location', downgradeInjectable($locationShim))

    .component(AppComponent.name, AppComponent)
    .component("saDashboard", dashboardComponent)

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        
        $routeProvider
            .when('/dashboard', {
                template: '<sa-dashboard></sa-dashboard>'
            })

            .otherwise({
                redirectTo: "/dashboard"
            });
    }]);