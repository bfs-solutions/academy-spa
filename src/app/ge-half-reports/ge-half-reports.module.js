'use strict';

import angular from "angular";
import AngularRouteModule from 'angular-route';
import 'angular1-async-filter';
import AngularUIBootstrapModule from 'ui-bootstrap4';

import sharedModule from "../shared/shared.module";
import * as studentHalfReportHost from "./student-half-report-host.component";
import * as studentHalfReport from "./student-half-report.component";

/** Half Reports module.
 *
 * Provide half report (student, group, etc.) directives and host directives.
 *
 * Register the following directives:
 * * *appHalfReportsStudentHalfReportHost* using
 *   {@link StudentHalfReportHostComponent}
 * * *appHalfReportsStudentHalfReport* using {@link StudentHalfReportComponent}
 */
export default angular.module('app.ge-half-reports', [
    AngularRouteModule, 
    'asyncFilter', 
    AngularUIBootstrapModule, 
    
    sharedModule.name
])

    .component('appGeHalfReportsStudentHalfReportHost',
        studentHalfReportHost.StudentHalfReportHostComponent)

    .component('appGeHalfReportsStudentHalfReport',
        studentHalfReport.StudentHalfReportComponent)

    .config(['$routeProvider', function ($routeProvider) {
        
        $routeProvider
            .when('/ge-half-reports/student-half-report', {
                template: `<app-ge-half-reports-student-half-report-host>
                   </app-ge-half-reports-student-half-report-host>`
            });
    }]);
