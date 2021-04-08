"use strict";

import enrollRegisteredStudentComponentTemplate from "./enroll-registered-student.component.html";

class EnrollRegisteredStudentComponentController {

    static $inject = ['$scope', '$routeParams', 'students', 'courses', 'institutions'];

    constructor($scope, $routeParams, students, courses, institutions) {
        
        let courseId = parseInt($routeParams.course);
        let editionId = parseInt($routeParams.edition);
        let groupId = parseInt($routeParams.group);

        $scope.error = null;
        $scope.student = {};
        $scope.enrollment = {
            is_repeat: false,
            meet_requirements: false,
            comming_from: null
        };

        $scope.students = students;

        // $scope.$routeParams = $routeParams;

        $scope.institutions = institutions;

        // // force method binding
        this.finishedWizard = this.finishedWizard.bind(this);

        this.$scope = $scope;

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

    finishedWizard() {
        return this.$scope.group.enrollments.addResource(Object.assign({},
            this.$scope.enrollment, {student: this.$scope.student.id}
        ));
    }
}

export default {
    controller: EnrollRegisteredStudentComponentController,
    template: enrollRegisteredStudentComponentTemplate
};