
'use strict';

import usersTemplate from './users.component.html';

/** Users component controller.
 *
 * Pass required services to the view layer.
 */
class UsersController {

  constructor($scope, $uibModal, users, authentication){
    'ngInject';

    $scope.users = users;
    $scope.currentUsersPage = 1;
    $scope.usersPerPage = 10;
    $scope.authentication = authentication;

    this.$scope = $scope;
    this.$uibModal = $uibModal;
    this.users = users;
  }

  /** Open a modal dialog used to prevent the user mistakes.
   *
   * It prevent the user from deleting the user by mistake if inadvertently
   * click on the delete button.
   *
   * @param {Object} user The user instance to delete.
   * @return The modal instance.
   */
  openDeleteModal(user){
    return this.$uibModal.open({
      animation: true,
      component: 'app-users-delete-modal',
      resolve: {
        user: function () { return user; }
      }
    });
  }

  /** Toggle the disable state of a user account resource.
   *
   * It set the `togglingDisabled` attribute of the user account resource to
   * *true* at the start and set back to *false* on request completion.
   *
   * If an error occur it's passed into the *$scope* *error* variable.
   *
   * @param user User account resource.
   */
  toggleDisabled(user) {
    user.togglingDisabled = true;

    this.users.updateResource(user, {disabled: !user.disabled}).then(
      () => user.togglingDisabled = false,
      (err) => {
        this.$scope.error = err;
        user.togglingDisabled = false;
      }
    );
  }
}

/** Component providing core view of user management.
 *
 * It list all users and allow basic actions such as deleting and locking
 * existing users. Additionally it provide links into additional views used
 * to create new users and update existing ones.
 */
export const UsersComponent = {
  controller: UsersController,
  template: usersTemplate
};
