'use strict';

import institutionsTemplate from "./institutions.component.html";

/** Institutions component controller.
 *
 * Pass required services to the view layer.
 */
class InstitutionsController {

    static $inject = ['$scope', '$uibModal', 'institutions'];

    constructor($scope, $uibModal, institutions) {
        // initialize scope
        $scope.institutions = institutions;
        $scope.currentInstitutionsPage = 1;
        $scope.institutionsPerPage = 10;

        this.$uibModal = $uibModal;
    }

    /** Open a modal dialog used to prevent the user mistakes.
     *
     * It prevent the user from deleting the institutions by mistake if
     * inadvertently click on the delete button.
     *
     * @param {Object} institution The institution instance to delete.
     * @return The modal instance.
     */
    openDeleteModal(institution) {
        return this.$uibModal.open({
            animation: true,
            component: 'app-institutions-delete-modal',
            resolve: {
                institution: function () {
                    return institution;
                }
            }
        });
    }
}

/** Component providing core view of institutions management.
 *
 * It list all institutions and allow basic actions such as deleting and
 * locking existing institutions. Additionally it provide links into additional
 * views used to create new institutions and update existing ones.
 */
export const InstitutionsComponent = {
    controller: InstitutionsController,
    template: institutionsTemplate
};
