
'use strict';

import studentsTemplate from './students.component.html';

/** Students component controller.
 *
 * Pass required services to the view layer.
 */
class StudentsController {

  static $inject = ['$scope', 'students'];

  constructor($scope, students){
    // initialize scope
    $scope.students = students;
    $scope.currentStudentsPage = 1;
    $scope.studentsPerPage = 10;
  }
}

/** Component providing core view of students management.
 *
 * It list all students and allow basic actions such as updating existing
 * student records. Additionally it provide links into additional
 * views used to register new students and update existing ones.
 */
export const StudentsComponent = {
  controller: StudentsController,
  template: studentsTemplate
};
