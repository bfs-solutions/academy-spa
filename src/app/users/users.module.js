
'use strict';

import sharedModule from '../shared/shared.module';
import securityModule from '../security/security.module';

import * as users from './users.component';
import * as deleteModal from './delete-modal.component';
import * as newUser from './new-user.component';
import * as editUser from './edit-user.component';

/** Users module.
 *
 * Provide user management features to the application.
 *
 * Register the following directives:
 * * *appUsers* using {@link UsersComponent}
 * * *appUsersDeleteModal* using {@link DeleteModalComponent}
 * * *appUsersNewUser* using {@link NewUserComponent}
 * * *appUsersEditUser* using {@link EditUserComponent}
 */
export default angular.module('app.users', [
  'ngRoute', 'asyncFilter', 'ngStorage', 'ui.bootstrap', sharedModule.name,
  securityModule.name
])

  .component('appUsers', users.UsersComponent)
  .component('appUsersDeleteModal', deleteModal.DeleteModalComponent)
  .component('appUsersNewUser', newUser.NewUserComponent)
  .component('appUsersEditUser', editUser.EditUserComponent)

  .config(function($routeProvider) {
    'ngInject';

    $routeProvider
      .when('/users', {
        template: '<app-users></app-users>'
      })

      .when('/users/_new', {
        template: '<app-users-new-user></app-users-new-user>'
      })

      .when('/users/:user/_edit', {
        template: '<app-users-edit-user></app-users-edit-user>'
      });
  });
