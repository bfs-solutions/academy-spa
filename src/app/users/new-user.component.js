
'use strict';

import userFormTemplate from './user-form.template.html';

/** New user component controller.
 *
 * Inject required services into the view.
 */
class NewUserController {

  static $inject = ['$scope', '$location', 'users'];

  constructor($scope, $location, users){
    this.$scope = $scope;
    this.$location = $location;
    this.users = users;

    this.processing = false;
    this.modeEdit = false;

    $scope.form = {
      roles: '1'
    };
  }

  submit(form){

    this.$scope.$broadcast('show-errors-check-validity');

    if (!this.$scope.userForm.$valid) { return; }

    if(this.users.getValue().find(u => u.login === form.login)){
      this.$scope.error = 'Existe un usuario con ese login';
      return;
    }

    switch (form.roles) {
      case '1':
        form.roles = ['user'];
        break;
      case '2':
        form.roles = ['user', 'administrator'];
        break;
    }

    this.processing = true;

    this.users.addResource(form).then(
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

/** Component providing new user handling and processing.
 */
export const NewUserComponent = {
  controller: NewUserController,
  template: userFormTemplate
};
