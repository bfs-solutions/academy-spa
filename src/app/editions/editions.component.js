"use strict";

import editionsComponentTemplate from "./editions.component.html";

class EditionsComponentController {

    static $inject = ['$scope', '$routeParams', '$uibModal', 'courses'];

    constructor($scope, $routeParams, $uibModal, courses) {
        
        let courseId = parseInt($routeParams.course);

        courses.subscribe(courses => {

            if (!courses) return;

            $scope.course = courses.find(c => c.id === courseId);
        });

        this.$uibModal = $uibModal;
        this.$scope = $scope;
    }

    /** Open modal window to confirm enrollment deletion */
    openDeleteModal(edition) {
        let modal = this.$uibModal.open({
            animation: true,
            component: 'sa-delete-edition',
            resolve: {
                edition: function () {
                    return edition;
                },
                editions: () => {
                    return this.$scope.course.editions;
                }
            }
        });
    }
}

export default {
    controller: EditionsComponentController,
    template: editionsComponentTemplate
};