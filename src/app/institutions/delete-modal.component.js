'use strict';

import deleteModalTemplate from "./delete-modal.component.html";

/** Delete Modal component controller.
 *
 * Implement the delete action and publish progress info into the scope.
 */
class DeleteModalController {

    static $inject = ['$scope', 'institutions'];

    constructor($scope, institutions) {
        this.deleting = false;
        this.blocked = true;
        this.$scope = $scope;
        this.institutions = institutions;
    }

    $onInit() {
        // prevent delete if the institution is associated to any enrollment
        this.resolve.institution.enrollments.subscribe(enrollments => {
            if (!enrollments) {
                return;
            }

            this.$scope.$applyAsync(() => {
                this.blocked = enrollments.length !== 0;
            });
        });
    }

    proceed() {
        this.deleting = true;

        this.institutions.deleteResource(this.resolve.institution).then(() => {
            this.deleting = false;
            this.close({$value: this.resolve.institution});
        }, err => {
            this.deleting = false;
            this.error = err;
        });
    }
}

/** Component providing institution delete modal dialog.
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
