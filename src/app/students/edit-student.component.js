
'use strict';

import studentFormTemplate from './student-form.template.html';

class EditStudentController {

  static $inject = ['$scope', '$location', '$routeParams', 'students'];

  constructor($scope, $location, $routeParams, students){
    this.modeEdit = true;
    this.$scope = $scope;
    this.$location = $location;
    this.students = students;

    let studentId = parseInt($routeParams.student);

    students.subscribe(students => {

      if(!students){ return; }

      $scope.$applyAsync(() => {
        $scope.form = students.find(s => s.id === studentId);
      });

    }, err => $scope.error = err);
  }

  submit(form){

    this.$scope.$broadcast('show-errors-check-validity');

    if (!this.$scope.studentForm.$valid) { return; }

    this.processing = true;

    this.students.updateResource(form, form).then(
      (res) => {
        this.processing = false;

        if (200 > res.status || res.status > 299) {
          this.$scope.error = `${res.statusText}: ${res.data.toString()}`;
          return;
        }

        // force retrieval of students collection
        this.students.retrieveCollection();

        this.$location.path('/students');
      },
      (err) => { this.$scope.error = err; this.processing = false; }
    );
  }
}

/** Component providing student edition form handling and processing
 */
export const EditStudentComponent = {
  controller: EditStudentController,
  template: studentFormTemplate
};
