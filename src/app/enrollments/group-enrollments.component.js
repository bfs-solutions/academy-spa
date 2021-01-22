"use strict";

import groupEnrollmentsComponentTemplate from "./group-enrollments.component.html";

class GroupEnrollmentsComponentController {

    constructor($scope, $routeParams, courses, editions, groups) {
        "ngInject";

        let courseId = parseInt($routeParams.course),
            editionId = parseInt($routeParams.edition),
            groupId = parseInt($routeParams.group);

        courses.subscribe(courses => {

            if (!courses) return;

            $scope.course = courses.find(c => c.id === courseId);

            $scope.course.editions.subscribe(editions => {

                if (!editions) return;

                $scope.edition = editions.find(e => e.id === editionId);

                $scope.edition.groups.subscribe(groups => {

                    if (!groups) return;

                    $scope.group = groups.find(g => g.id === groupId);
                });
            });
        });
    }
}

export default {
    controller: GroupEnrollmentsComponentController,
    template: groupEnrollmentsComponentTemplate
};
