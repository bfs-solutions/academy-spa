
'use strict';

import angular from "angular";
import AngularRouteModule from 'angular-route';

import * as enrollmentRecordsHost from './enrollment-records-host.component';
import * as enrollmentRecord from './enrollment-record.component';
import * as enrollmentCertificatesHost
  from './enrollment-certificates-host.component';
import * as enrollmentCertificate from './enrollment-certificate.component';

/** Enrollment Reports module
 *
 * Provide access to the different reports related to the enrollment process.
 *
 * Register the following directives:
 * * *appReportsEnrollmentEnrollmentRecordsHost* using
 *   {@link EnrollmentRecordsHostComponent}
 * * *appReportsEnrollmentsEnrollmentRecord* using
 *   {@link EnrollmentCertificateComponent}
 */
export default angular.module('app.reports-enrollments', [AngularRouteModule])

  .component('appReportsEnrollmentsEnrollmentRecordsHost',
    enrollmentRecordsHost.EnrollmentRecordsHostComponent)

  .component('appReportsEnrollmentsEnrollmentRecord',
    enrollmentRecord.EnrollmentRecordComponent)

  .component('appReportsEnrollmentsEnrollmentCertificatesHost',
    enrollmentCertificatesHost.EnrollmentRecordsHostComponent)

  .component('appReportsEnrollmentsEnrollmentCertificate',
    enrollmentCertificate.EnrollmentCertificateComponent)

  .config(function($routeProvider) {
    'ngInject';

    $routeProvider
      .when('/reports-enrollments/enrollment-records', {
        template: '<app-reports-enrollments-enrollment-records-host>' +
        '</app-reports-enrollments-enrollment-records-host>'
      })

      .when('/reports-enrollments/enrollment-certificates', {
        template: '<app-reports-enrollments-enrollment-certificates-host>' +
        '</app-reports-enrollments-enrollment-certificates-host>'
      });
  });
