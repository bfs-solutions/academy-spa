/* jshint -W117, -W030 */

'use strict';

describe('app-users.module', function () {

  // Load the app.users module
  beforeEach(angular.mock.module('app.users'));

  it('define app.users module', function () {
    angular.module('app.users');
  });

  it('should map /users route to the app-users component',
    inject(function($route) {

      expect($route.routes['/users'].template).toBe('<app-users></app-users>');
    }));

  it('should map /users/_new route to the app-users-new-user component',
    inject(function($route) {

      expect($route.routes['/users/_new'].template).toBe('<app-users-new-user></app-users-new-user>');
    }));

  it('should map /users/:user/_edit route to the app-users-edit-user component',
    inject(function($route) {

      expect($route.routes['/users/:user/_edit'].template).toBe('<app-users-edit-user></app-users-edit-user>');
    }));

  it('provide appUsers component', inject(function($injector){
    expect($injector.has('appUsersDirective')).toBe(true);
  }));

  it('provide appUsersDeleteModal component', inject(function($injector){
    expect($injector.has('appUsersDeleteModalDirective')).toBe(true);
  }));

  it('provide appUsersNewUser component', inject(function($injector){
    expect($injector.has('appUsersNewUserDirective')).toBe(true);
  }));

  it('provide appUsersEditUser component', inject(function($injector){
    expect($injector.has('appUsersEditUserDirective')).toBe(true);
  }));
});
