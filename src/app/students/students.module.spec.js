/* jshint -W117, -W030 */

'use strict';

describe('app.students', function () {

  // Load the app module
  beforeEach(angular.mock.module('app.students'));

  it('define app.students module', function () {
    angular.module('app.students');
  });

  it('should map /students route to the app-students component',
    inject(function($route) {

      expect($route.routes['/students'].template)
        .toBe('<app-students></app-students>');
    }));

  it('should map /students/:student/_edit route to the app-students component',
    inject(function($route) {

      expect($route.routes['/students/:student/_edit'].template)
        .toBe('<app-students-edit-student></app-students-edit-student>');
    }));

  it('provide appStudents component', inject(function($injector){
    expect($injector.has('appStudentsDirective')).toBe(true);
  }));

  it('provide appStudentsEditStudent component', inject(function($injector){
    expect($injector.has('appStudentsEditStudentDirective')).toBe(true);
  }));
});
