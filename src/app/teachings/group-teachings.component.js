'use strict';

import groupTeachingsComponentTemplate from "./group-teachings.component.html";

class GroupTeachingsComponentController {

    static $inject = ['$scope', '$routeParams', '$uibModal', 'courses'];

    constructor($scope, $routeParams, $uibModal, courses) {
        let courseId = parseInt($routeParams.course);

        this.$scope = $scope;
        this.$uibModal = $uibModal;
        this.editionId = parseInt($routeParams.edition);
        this.groupId = parseInt($routeParams.group);

        courses.subscribe(courses => {
            if (!courses) return;

            $scope.course = courses.find(c => c.id === courseId);

            this.findEdition($scope.course.editions);
        });
    }

    findEdition(editions) {
        editions.subscribe(editions => {
            if (!editions) return;

            this.$scope.edition = editions.find(e => e.id === this.editionId);

            this.findGroup(this.$scope.edition.groups);
        });
    }

    findGroup(groups) {

        groups.subscribe(groups => {
            if (!groups) return;

            this.$scope.group = groups.find(g => g.id === this.groupId);
        });
    }

    /** Open modal window to confirm teaching deletion */
    openDeleteModal(teaching) {
        let modal = this.$uibModal.open({
            animation: true,
            component: 'sa-delete-teaching',
            resolve: {
                teachings: () => {
                    return this.$scope.group.teachings;
                },
                teaching: function () {
                    return teaching;
                }
            }
        });
    }
}

export default {
    controller: GroupTeachingsComponentController,
    template: groupTeachingsComponentTemplate
}