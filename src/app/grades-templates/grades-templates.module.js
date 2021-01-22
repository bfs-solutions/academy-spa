'use strict';

import sharedModule from "../shared/shared.module";
// import * as studentHalfReportHost from "./student-half-report-host.component";
// import * as studentHalfReport from "./student-half-report.component";
// import * as groupHalfReportHost from "./group-half-report-host.component";
// import * as groupHalfReport from './group-half-report.component';
import * as subjectHalfTemplateHost from './subject-half-template-host.component';
import * as subjectHalfTemplate from './subject-half-template.component';

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
 *    {@link SubjectHalfTemplateHostComponent}
 */
export default angular.module('app.grades-templates', [
    'ngRoute', 'asyncFilter', 'ui.bootstrap', sharedModule.name
])

    // .component('appHalfReportsStudentHalfReportHost',
    //     studentHalfReportHost.StudentHalfReportHostComponent)
    //
    // .component('appHalfReportsStudentHalfReport',
    //     studentHalfReport.StudentHalfReportComponent)
    //
    // .component('appHalfReportsGroupHalfReportHost',
    //     groupHalfReportHost.GroupHalfReportHostComponent)
    //
    // .component('appHalfReportsGroupHalfReport',
    //     groupHalfReport.GroupHalfReportComponent)
    //
    .component('appGradesTemplatesSubjectHalfTemplateHost',
        subjectHalfTemplateHost.SubjectHalfTemplateHostComponent)

    .component('appGradesTemplatesSubjectHalfTemplate',
        subjectHalfTemplate.SubjectHalfTemplateComponent)

    .config(function ($routeProvider) {
        'ngInject';

        $routeProvider
    //         .when('/half-reports/student-half-report', {
    //             template: `<app-half-reports-student-half-report-host>
    //                </app-half-reports-student-half-report-host>`
    //         })
    //
    //         .when('/half-reports/group-half-report', {
    //             template: `<app-half-reports-group-half-report-host>
    //                </app-half-reports-group-half-report-host>`
    //         })
    //
            .when('/grades-templates/subject-half-template', {
                template: `<app-grades-templates-subject-half-template-host>
                   </app-grades-templates-subject-half-template-host>`
            });
    });
