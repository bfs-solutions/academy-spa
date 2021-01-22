
'use strict';

import sharedModule from "../shared/shared.module";

import * as seReportHost from "./se-report-host.component";
import * as seReport from "./se-report.component";
import * as finalGradesHost from "./final-grades-host.component";
import * as finalGrades from "./final-grades.component";

export default angular.module('app.se-reports', [
    'ngRoute', 'asyncFilter', 'ui.bootstrap', sharedModule.name
])

    .component('appSeReportsSeReportHost', seReportHost.SEReportHostComponent)

    .component('appSeReportsSeReport', seReport.SeReportComponent)

    .component('appSeReportsFinalGradesHost', finalGradesHost.FinalGradesHostComponent)

    .component('appSeReportsFinalGrades', finalGrades.FinalGradesComponent)

    .config(function ($routeProvider) {
        'ngInject';

        $routeProvider
            .when('/se-reports/se-report', {
                template: `<app-se-reports-se-report-host>
                   </app-se-reports-se-report-host>`
            })

            .when('/se-reports/final-grades', {
                template: `<app-se-reports-final-grades-host>
                   </app-se-reports-final-grades-host>`
            });
    });