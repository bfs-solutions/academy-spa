'use strict';

import sharedModule from "../shared/shared.module";
import * as studentPartialReportHost from "./student-partial-report-host.component";
import * as studentPartialReport from "./student-partial-report.component";

import * as groupPartialReportHost from './group-partial-report-host.component';
import * as groupPartialReport from './group-partial-report.component';

import * as subjectPartialReportHost
    from './subject-partial-report-host.component';

/** Partial Reports module.
 *
 * Provide partial report (student, group, etc.) directives and host directives.
 *
 * Register the following directives:
 * * *appPartialReportsStudentPartialReportHost* using
 *   {@link GroupHalfReportHostComponent}
 * * *appPartialReportsStudentPartialReport* using
 *   {@link StudentHalfReportComponent}
 */
export default angular.module('app.partial-reports', [
    'ngRoute', 'asyncFilter', sharedModule.name
])

    .component('appPartialReportsStudentPartialReportHost',
        studentPartialReportHost.StudentPartialReportHostComponent)

    .component('appPartialReportsStudentPartialReport',
        studentPartialReport.StudentPartialReportComponent)

    .component('appPartialReportsGroupPartialReportHost',
        groupPartialReportHost.GroupPartialReportHostComponent)

    .component('appPartialReportsGroupPartialReport',
        groupPartialReport.GroupPartialReportComponent)

    .component('appPartialReportsSubjectPartialReportHost',
        subjectPartialReportHost.SubjectPartialReportHostComponent)

    .config(function ($routeProvider) {
        'ngInject';

        $routeProvider
            .when('/partial-reports/student-partial-report', {
                template: `<app-partial-reports-student-partial-report-host>
                   </app-partial-reports-student-partial-report-host>`
            })

            .when('/partial-reports/group-partial-report', {
                template: `<app-partial-reports-group-partial-report-host>
                   </app-partial-reports-group-partial-report-host>`
            })

            .when('/partial-reports/subject-partial-report', {
                template: `<app-partial-reports-subject-partial-report-host>
                   </app-partial-reports-subject-partial-report-host>`
            });
    });
