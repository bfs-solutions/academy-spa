
'use strict';

import userFormTemplate from './user-form.template.html';

class EditUserController {

  constructor($scope, $routeParams, $location, users){
    'ngInject';

    this.$scope = $scope;
    this.users = users;
    this.$location = $location;

    this.loading = true;
    this.processing = false;
    this.modeEdit = true;

    users.subscribe(users => {

      // discard users collection initial state
      if(!users){ return; }

      $scope.$applyAsync(() => {
        $scope.form = users.find(u => u.login === $routeParams.user);

        this.loading = false;

        if(!$scope.form){ return; }

        $scope.form.roles = $scope.form.roles.length.toString();
      });
    }, err => $scope.error = err);
  }

  submit(user) {
    this.$scope.$broadcast('show-errors-check-validity');

    if (!this.$scope.userForm.$valid) { return; }

    let changes = {};

    if (user.password && user.password !== '') {
      changes.password = user.password;
    }

    if (user.name && user.name !== '') {
      changes.name = user.name;
    }

    switch (user.roles) {
      case '1':
        changes.roles = ['user'];
        break;
      case '2':
        changes.roles = ['user', 'administrator'];
        break;
    }

    this.processing = true;

    this.users.updateResource(user, changes).then(
      (res) => {
        this.processing = false;

        if (200 > res.status || res.status > 299) {
          this.$scope.error = `${res.statusText}: ${res.data.toString()}`;
          return;
        }

        this.$location.path('/users');
      },
      (err) => { this.$scope.error = err; this.processing = false; }
    );
  }
}

/** Component providing user account edition handling and processing.
 */
export const EditUserComponent = {
  controller: EditUserController,
  template: userFormTemplate
};
