"use strict";

import groupsComponentTemplate from "./groups.component.html";

class GroupsComponentController {

    static $inject = ['$scope', '$routeParams', '$uibModal', 'courses', 'editions'];

    constructor($scope, $routeParams, $uibModal, courses, editions) {
        
        $scope.adding = false;

        let courseId = parseInt($routeParams.course),
            editionId = parseInt($routeParams.edition);

        courses.subscribe(courses => {

            if (!courses) return;

            $scope.course = courses.find(c => c.id === courseId);

            $scope.course.editions.subscribe(editions => {

                if (!editions) return;

                $scope.edition = editions.find(e => e.id === editionId);
            });
        });

        this.$scope = $scope;
        this.$uibModal = $uibModal;
    }

    add() {
        this.$scope.adding = true;

        let groups = this.$scope.edition.groups.getValue();

        let chars = [], char = ("A").charCodeAt(0);

        (groups || []).forEach(group => chars.push(group.label.charCodeAt(0) + 1));

        char = chars.reduce((a, b) => a > b ? a : b, char);

        this.$scope.edition.groups.addResource({
            label: String.fromCharCode(char)
        }).then(() => this.$scope.adding = false);
    }

    /** Open modal window to confirm enrollment deletion */
    openDeleteModal(group) {
        let modal = this.$uibModal.open({
            animation: true,
            component: 'sa-delete-group',
            resolve: {
                group: function () {
                    return group;
                },
                groups: () => {
                    return this.$scope.edition.groups;
                }
            }
        });
    }
}

export default {
    controller: GroupsComponentController,
    template: groupsComponentTemplate
};