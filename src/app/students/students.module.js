
'use strict';

import angular from "angular";
import AngularRouteModule from 'angular-route';
import 'angular1-async-filter';
import AngularUIBootstrapModule from 'ui-bootstrap4';

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
  AngularRouteModule, 
  'asyncFilter', 
  AngularUIBootstrapModule,
  
  sharedModule.name
])

  .component('appStudents', students.StudentsComponent)

  .component('appStudentsEditStudent', editStudent.EditStudentComponent)

  .config(['$routeProvider', function($routeProvider) {
    
    $routeProvider
      .when('/students', {
        template: '<app-students></app-students>'
      })

      .when('/students/:student/_edit', {
        template: `<app-students-edit-student></app-students-edit-student>`
      });
  }]);
