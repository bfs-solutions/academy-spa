
'use strict';

import sharedModule from '../shared/shared.module';

import * as students from './students.component';
import * as editStudent from './edit-student.component';

/** Students module.
 *
 * Provide student management features to the application.
 *
 * Register the following directives:
 * * *appStudents* using {@link StudentsComponent}
 * * *appStudentsEditStudent* using {@link EditStudentComponent}
 */
export default angular.module('app.students', [
  'ngRoute', 'asyncFilter', 'ui.bootstrap', sharedModule.name
])

  .component('appStudents', students.StudentsComponent)

  .component('appStudentsEditStudent', editStudent.EditStudentComponent)

  .config(function($routeProvider) {
    'ngInject';

    $routeProvider
      .when('/students', {
        template: '<app-students></app-students>'
      })

      .when('/students/:student/_edit', {
        template: `<app-students-edit-student></app-students-edit-student>`
      });
  });
