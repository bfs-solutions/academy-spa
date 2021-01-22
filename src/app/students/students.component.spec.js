/* jshint -W117, -W030 */

'use strict';

describe('students.component', function () {

  let $rootScope, element, studentsFixture = [
    {name: 'student1', nid: 'nid1',
      'legal_guardian_name': 'legal_guardian_name1'},
    {name: 'student2', nid: 'nid2',
      'legal_guardian_name': 'legal_guardian_name2'}
  ];

  // Load the app module, which contains the directive
  beforeEach(angular.mock.module('app.students'));

  // Compile component and fire digest cycle
  beforeEach(inject(function(_$compile_, _$rootScope_){

    $rootScope = _$rootScope_;

    // Compile a piece of HTML containing the directive
    element = _$compile_('<app-students></app-students>')(_$rootScope_);

    // fire all the watches, so the scope expressions will be evaluated
    $rootScope.$digest();
  }));

  it('Replaces the element with the appropriate content', function() {
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain('Estudiantes');
  });

  it('shows the student list', inject(function (students) {

    students.onNext(studentsFixture);

    // fire all the watches, so the scope expressions will be evaluated
    $rootScope.$digest();

    studentsFixture.forEach(i => {
      expect(element.html()).toContain(i.name);
    });
  }));

  it('shows student nid', inject(function (students) {

    students.onNext(studentsFixture);

    // fire all the watches, so the scope expressions will be evaluated
    $rootScope.$digest();

    studentsFixture.forEach(i => {
      expect(element.html()).toContain(i.nid);
    });
  }));

  it('shows student legal_guardian_name', inject(function (students) {

    students.onNext(studentsFixture);

    // fire all the watches, so the scope expressions will be evaluated
    $rootScope.$digest();

    studentsFixture.forEach(i => {
      expect(element.html()).toContain(i['legal_guardian_name']);
    });
  }));
});
