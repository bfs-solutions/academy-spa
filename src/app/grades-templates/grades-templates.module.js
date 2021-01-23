'use strict';

import angular from "angular";
import AngularRouteModule from 'angular-route';
import 'angular1-async-filter';
import AngularUIBootstrapModule from 'angular-ui-bootstrap';

import sharedModule from "../shared/shared.module";
import * as subjectHalfTemplateHost from './subject-half-template-host.component';
import * as subjectHalfTemplate from './subject-half-template.component';

/** Half Reports module.
 *
 * Provide half report (student, group, etc.) directives and host directives.
 *
 * Register the following directives:
 * * *appHalfReportsSubjectHalfReportHost* using
 *    {@link SubjectHalfTemplateHostComponent}
 */
export default angular.module('app.grades-templates', [
    AngularRouteModule, 
    'asyncFilter', 
    AngularUIBootstrapModule, 
    
    sharedModule.name
])
    .component('appGradesTemplatesSubjectHalfTemplateHost',
        subjectHalfTemplateHost.SubjectHalfTemplateHostComponent)

    .component('appGradesTemplatesSubjectHalfTemplate',
        subjectHalfTemplate.SubjectHalfTemplateComponent)

    .config(function ($routeProvider) {
        'ngInject';

        $routeProvider
            .when('/grades-templates/subject-half-template', {
                template: `<app-grades-templates-subject-half-template-host>
                   </app-grades-templates-subject-half-template-host>`
            });
    });
