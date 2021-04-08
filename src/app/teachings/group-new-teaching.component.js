"use strict";

import groupNewTeachingComponentTemplate from "./group-new-teaching.component.html";

class GroupNewTeachingComponentController {

    static $inject = ['$scope', '$routeParams', '$location', 'AclService', 'courses', 'users'];

    constructor($scope, $routeParams, $location, AclService, courses, users) {
        let courseId = parseInt($routeParams.course);

        $scope.can = AclService.can;
        $scope.users = users;
        $scope.saving = false;

        this.$scope = $scope;
        this.$location = $location;
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

    submit(form) {

        this.$scope.$broadcast('show-errors-check-validity');

        if (!this.$scope.newGroupTeachingForm.$valid) return;

        let teaching = {
            user: form.user.login,
            subject: form.subject.id
        };

        this.$scope.saving = true;

        this.$scope.group.teachings.addResource(teaching).then((res) => {
            this.$scope.saving = false;

            if (200 > res.status || res.status > 299) {
                this.$scope.error = `${res.statusText}: ${res.data.toString()}`;
                return;
            }

            this.$location.path(`/courses/${this.$scope.course.id}/editions/${this.$scope.edition.id}/groups/${this.$scope.group.id}/teachings`);
        }, (err) => {
            this.$scope.saving = false;
            this.$scope.error = err;
        });
    }
}

export default {
    controller: GroupNewTeachingComponentController,
    template: groupNewTeachingComponentTemplate
};