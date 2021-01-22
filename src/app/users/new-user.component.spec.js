/* jshint -W117, -W030 */

'use strict';

class CollectionServiceMock {

  constructor($q){
    'ngInject';

    this.$q = $q;
  }

  getValue(){ return[]; }

  addResource(){
    return this.$q.resolve(true);
  }
}

describe('users.new-user.component', function () {

  let element, $rootScope, $componentController, users;

  // Load the app.institutions module, which contains the directive
  beforeEach(angular.mock.module('app.users'));

  // mock the institutions service used by the component
  beforeEach(angular.mock.module(function ($provide) {
    $provide.service('users', CollectionServiceMock);
  }));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_, _$componentController_,
                             _users_){

    $componentController = _$componentController_;

    $rootScope = _$rootScope_;

    users = _users_;

    // Compile a piece of HTML containing the directive
    element = _$compile_('<app-users-new-user></app-users-new-user>')(_$rootScope_);

    spyOn(_users_, 'addResource').and.callThrough();

    // fire all the watches, so the scope expressions will be evaluated
    // $rootScope.$digest();
  }));

  it('Replaces the element with the appropriate content', function() {
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain('Nuevo Usuario');
  });

  describe('users.NewUserController', function () {
    it('controller submit() call users.addResource() if form valid', function() {
      let $scope = $rootScope.$new(false);

      $scope.userForm = {$valid: true};

      let controller = $componentController('appUsersNewUser', {$scope: $scope});

      controller.submit({});

      expect(users.addResource).toHaveBeenCalled();
    });

    it('controller submit() set processing before promise resolve', function() {
      let $scope = $rootScope.$new(false);

      $scope.userForm = {$valid: true};

      let controller = $componentController('appUsersNewUser', {$scope: $scope});

      controller.submit({});

      expect(controller.processing).toBe(true);
    });

    it('controller submit() unset processing after promise resolve', function() {
      let $scope = $rootScope.$new(false);

      $scope.userForm = {$valid: true};

      let controller = $componentController('appUsersNewUser', {$scope: $scope});

      controller.submit({});

      $rootScope.$digest();

      expect(controller.processing).toBe(false);
    });
  });
});
