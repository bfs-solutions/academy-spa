/* jshint -W117, -W030 */

'use strict';

import * as rx from 'rx';

class CollectionServiceMock extends rx.BehaviorSubject {

  constructor($q){
    'ngInject';

    super([]);

    this.$q = $q;
  }

  updateResource(){
    return this.$q.resolve({status: 200});
  }

  retrieveCollection(){}
}

describe('students.edit-student.component', function () {

  let element, $rootScope, $componentController, students;

  // Load the app.institutions module, which contains the directive
  beforeEach(angular.mock.module('app.students'));

  // mock the institutions service used by the component
  beforeEach(angular.mock.module(function ($provide) {
    $provide.service('students', CollectionServiceMock);
  }));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_, _$componentController_,
                             _students_){

    $componentController = _$componentController_;

    $rootScope = _$rootScope_;

    students = _students_;

    // Compile a piece of HTML containing the directive
    element = _$compile_('<app-students-edit-student></app-students-edit-student>')(_$rootScope_);

    spyOn(_students_, 'updateResource').and.callThrough();
    spyOn(_students_, 'retrieveCollection').and.callThrough();

    // fire all the watches, so the scope expressions will be evaluated
    // $rootScope.$digest();
  }));

  it('Replaces the element with the appropriate content', function() {
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain('Modificar Estudiante');
  });

  describe('students.EditStudentController', function () {
    it('controller submit() call students.updateResource() if form valid', function() {
      let $scope = $rootScope.$new();

      $scope.studentForm = {$valid: true};

      let controller = $componentController('appStudentsEditStudent', {$scope: $scope});

      controller.submit({});

      expect(students.updateResource).toHaveBeenCalled();
    });

    it('controller submit() set processing before promise resolve', function() {
      let $scope = $rootScope.$new();

      $scope.studentForm = {$valid: true};

      let controller = $componentController('appStudentsEditStudent', {$scope: $scope});

      controller.submit({});

      expect(controller.processing).toBe(true);
    });

    it('controller submit() unset processing after promise resolve', function() {
      let $scope = $rootScope.$new();

      $scope.studentForm = {$valid: true};

      let controller = $componentController('appStudentsEditStudent', {$scope: $scope});

      controller.submit({});

      $rootScope.$digest();

      expect(controller.processing).toBe(false);
    });
  });
});
