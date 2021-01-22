/* jshint -W117, -W030 */

'use strict';

describe('app.reports-enrollments', function () {

  // Load the app module
  beforeEach(angular.mock.module('app.reports-enrollments'));

  it('define app.reports-enrollments module', function () {
    angular.module('app.reports-enrollments');
  });

  it('should map /reports-enrollments/enrollment-records route to the ' +
    'app-reports-enrollments-enrollment-records-host component',
    inject(function($route) {

      expect($route.routes['/reports-enrollments/enrollment-records'].template)
        .toBe('<app-reports-enrollments-enrollment-records-host></app-reports-enrollments-enrollment-records-host>');
    }));

  it('provide appReportsEnrollmentsEnrollmentRecordsHost component', inject(function($injector){
    expect($injector.has('appReportsEnrollmentsEnrollmentRecordsHostDirective')).toBe(true);
  }));

  it('provide appReportsEnrollmentsEnrollmentRecord component', inject(function($injector){
    expect($injector.has('appReportsEnrollmentsEnrollmentRecordDirective')).toBe(true);
  }));
});
