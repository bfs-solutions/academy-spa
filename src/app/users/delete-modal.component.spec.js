/* jshint -W117, -W030 */

'use strict';

import * as rx from 'rx';

class CollectionServiceMock extends rx.BehaviorSubject {

  constructor($q){
    'ngInject';

    super([]);

    this.$q = $q;
  }

  deleteResource(){
    return this.$q.resolve(true);
  }
}

describe('users.delete-modal.component', function () {

  let element, $rootScope, $componentController, users, $scope;

  // Load the app.institutions module, which contains the directive
  beforeEach(angular.mock.module('app.users'));

  // mock the users service and teachings service used by the component
  beforeEach(angular.mock.module(function ($provide) {
    $provide.service('users', CollectionServiceMock);
    $provide.service('teachings', CollectionServiceMock);
  }));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_, _$componentController_,
                             _users_, _teachings_){

    $componentController = _$componentController_;

    $rootScope = _$rootScope_;

    users = _users_;

    $scope = $rootScope.$new();

    $scope.resolve = {
      user: {
        teachings: _teachings_
      }
    };

    // Compile a piece of HTML containing the directive
    element = _$compile_('<app-users-delete-modal resolve="resolve"></app-users-delete-modal>')($scope);

    spyOn(_users_, 'deleteResource').and.callThrough();
  }));

  it('Replaces the element with the appropriate content', function() {
    // Check that the compiled element contains the template content
    expect(element.html()).toContain('Atención');
  });

  describe('users.DeleteModalController', function () {
    it('controller proceed() call users.deleteResource() if form valid', function() {

      let controller = $componentController('appUsersDeleteModal', {$scope: $scope});

      controller.resolve = {
        user: {}
      };

      controller.proceed();

      expect(users.deleteResource).toHaveBeenCalled();
    });

    it('controller proceed() set deleting before promise resolve', function() {

      let controller = $componentController('appUsersDeleteModal', {$scope: $scope});

      controller.resolve = {
        user: {}
      };

      controller.proceed();

      expect(controller.deleting).toBe(true);
    });

    it('controller proceed() unset deleting after promise resolve', function() {

      let controller = $componentController('appUsersDeleteModal', {$scope: $scope});

      // mock component bindings
      controller.resolve = {
        user: {}
      };
      controller.close = () => null;

      controller.proceed();

      $rootScope.$digest();

      expect(controller.deleting).toBe(false);
    });

    it('controller proceed() call $ctrl.close() after promise resolve', function () {

      let controller = $componentController('appUsersDeleteModal', {$scope: $scope});

      // mock component bindings
      controller.resolve = {
        user: {}
      };
      controller.close = jasmine.createSpy('close');

      controller.proceed();

      $rootScope.$digest();

      expect(controller.close).toHaveBeenCalledWith({$value: controller.resolve.user});
    });
  });
});
