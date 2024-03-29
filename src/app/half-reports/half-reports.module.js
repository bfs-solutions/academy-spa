'use strict';

import angular from "angular";
import AngularRouteModule from 'angular-route';
import 'angular1-async-filter';
import AngularUIBootstrapModule from 'ui-bootstrap4';

import sharedModule from "../shared/shared.module";
import * as studentHalfReportHost from "./student-half-report-host.component";
import * as studentHalfReport from "./student-half-report.component";
import * as groupHalfReportHost from "./group-half-report-host.component";
import * as groupHalfReport from './group-half-report.component';
import * as subjectHalfReportHost from './subject-half-report-host.component';
import * as subjectHalfReport from './subject-half-report.component';

/** Half Reports module.
 *
 * Provide half report (student, group, etc.) directives and host directives.
 *
 * Register the following directives:
 * * *appHalfReportsStudentHalfReportHost* using
 *   {@link StudentHalfReportHostComponent}
 * * *appHalfReportsStudentHalfReport* using {@link StudentHalfReportComponent}
 * * *appHalfReportsGroupHalfReportHost* using
 *    {@link GroupHalfReportHostComponent}
 * * *appHalfReportsGroupHalfReport* using {@link GroupHalfReportComponent}
 * * *appHalfReportsSubjectHalfReportHost* using
 *    {@link SubjectHalfReportHostComponent}
 */
export default angular.module('app.half-reports', [
    AngularRouteModule, 
    'asyncFilter', 
    AngularUIBootstrapModule, 
    
    sharedModule.name
])

    .component('appHalfReportsStudentHalfReportHost',
        studentHalfReportHost.StudentHalfReportHostComponent)

    .component('appHalfReportsStudentHalfReport',
        studentHalfReport.StudentHalfReportComponent)

    .component('appHalfReportsGroupHalfReportHost',
        groupHalfReportHost.GroupHalfReportHostComponent)

    .component('appHalfReportsGroupHalfReport',
        groupHalfReport.GroupHalfReportComponent)

    .component('appHalfReportsSubjectHalfReportHost',
        subjectHalfReportHost.SubjectHalfReportHostComponent)

    .component('appHalfReportsSubjectHalfReport',
        subjectHalfReport.SubjectHalfReportComponent)

    .config(['$routeProvider', function ($routeProvider) {
        
        $routeProvider
            .when('/half-reports/student-half-report', {
                template: `<app-half-reports-student-half-report-host>
                   </app-half-reports-student-half-report-host>`
            })

            .when('/half-reports/group-half-report', {
                template: `<app-half-reports-group-half-report-host>
                   </app-half-reports-group-half-report-host>`
            })

            .when('/half-reports/subject-half-report', {
                template: `<app-half-reports-subject-half-report-host>
                   </app-half-reports-subject-half-report-host>`
            });
    }]);
