
'use strict';

import deleteModalTemplate from './delete-modal.component.html';

/** Delete Modal component controller.
 *
 * Implement the delete action and publish progress info into the scope.
 */
class DeleteModalController {

  static $inject = ['$scope', 'users'];

  constructor($scope, users){
    this.deleting = false;
    this.blocked = true;
    this.$scope = $scope;
    this.users = users;
  }

  $onInit(){
    // prevent delete if the institution is associated to any enrollment
    this.resolve.user.teachings.subscribe(teachings => {
      if(!teachings){ return; }

      this.$scope.$applyAsync(() => {
        this.blocked = teachings.length !== 0;
      });
    });
  }

  proceed(){
    this.deleting = true;

    this.users.deleteResource(this.resolve.user).then(() => {
      this.deleting = false;
      this.close({$value: this.resolve.user});
    }, err => { this.deleting = false; this.error = err; });
  }
}

/** Component providing user delete modal dialog.
 */
export const DeleteModalComponent = {
  controller: DeleteModalController,
  template: deleteModalTemplate,
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};
