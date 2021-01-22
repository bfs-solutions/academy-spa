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
    return this.$q.resolve(true);
  }
}

describe('users.component', function () {

  let $rootScope, element, $componentController, users, usersFixture = [
    {login: 'user1', name: 'user1 Name', roles: ['role1', 'role2', 'role3']},
    {login: 'user2', name: 'user2 Name', roles: ['role4', 'role5', 'role6']}
  ];

  // Load the app module, which contains the directive
  beforeEach(angular.mock.module('app.users'));

  // mock the users service used by the component
  beforeEach(angular.mock.module(function ($provide) {
    $provide.service('users', CollectionServiceMock);
  }));

  // Compile component and fire digest cycle
  beforeEach(inject(function(_$compile_, _$rootScope_, _$componentController_,
                             _users_){

    $rootScope = _$rootScope_;
    $componentController = _$componentController_;
    users = _users_;

    // Compile a piece of HTML containing the directive
    element = _$compile_('<app-users></app-users>')(_$rootScope_);

    spyOn(_users_, 'updateResource').and.callThrough();

    // fire all the watches, so the scope expressions will be evaluated
    $rootScope.$digest();
  }));

  it('Replaces the element with the appropriate content', function() {
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain('Usuarios');
  });

  it('shows users login', inject(function () {

    users.onNext(usersFixture);

    // fire all the watches, so the scope expressions will be evaluated
    $rootScope.$digest();

    usersFixture.forEach(u => {
      expect(element.html()).toContain(u.login);
    });
  }));

  it('shows users name', inject(function () {

    users.onNext(usersFixture);

    // fire all the watches, so the scope expressions will be evaluated
    $rootScope.$digest();

    usersFixture.forEach(u => {
      expect(element.html()).toContain(u.name);
    });
  }));

  it('shows users roles', inject(function () {

    users.onNext(usersFixture);

    // fire all the watches, so the scope expressions will be evaluated
    $rootScope.$digest();

    usersFixture.forEach(u => {
      u.roles.forEach(role => {
        expect(element.html()).toContain(role);
      });
    });
  }));

  describe('users.UsersController', function () {
    it('controller toggleDisabled() call users.updateResource() if form valid', function() {

      let controller = $componentController('appUsers', { $scope: {} });

      controller.toggleDisabled({});

      expect(users.updateResource).toHaveBeenCalled();
    });

    it('controller toggleDisabled() set user.togglingDisabled before promise resolve', function() {

      let user = { togglingDisabled: false };

      let controller = $componentController('appUsers', {$scope: {}});

      controller.toggleDisabled(user);

      expect(user.togglingDisabled).toBe(true);
    });

    it('controller proceed() unset deleting after promise resolve', function() {
      let user = { togglingDisabled: false };

      let controller = $componentController('appUsers', {$scope: {}});

      controller.toggleDisabled(user);

      $rootScope.$digest();

      expect(user.togglingDisabled).toBe(false);
    });
  });
});
