"use strict";

import enrollUnregisteredStudentComponentTemplate from "./enroll-unregistered-student.component.html";

class EnrollUnregisteredStudentComponentController {

    constructor($scope, $routeParams, students, courses, enrollments, institutions) {
        "ngInject";

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

        $scope.institutions = institutions;

        // force method binding
        this.validateFirstStep = this.validateFirstStep.bind(this);
        this.validateSecondStep = this.validateSecondStep.bind(this);
        this.validateThirdStep = this.validateThirdStep.bind(this);
        this.validateForthStep = this.validateForthStep.bind(this);
        this.finishedWizard = this.finishedWizard.bind(this);

        this.$scope = $scope;
        this.$routeParams = $routeParams;
        this.students = students;
        this.enrollments = enrollments;

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

    validateFirstStep() {
        this.$scope.error = null;
        if (this.$scope.student.name === null) {
            this.$scope.error = 'Nombres y Apellidos no se puede dejar en blanco';
            return false;
        }
        return true;
    }

    validateSecondStep() {
        this.$scope.error = null;
        return this.validateFirstStep();
    }

    validateThirdStep() {
        this.$scope.error = null;
        return this.validateSecondStep();
    }

    validateForthStep() {
        if (!this.validateThirdStep()) {
            return false;
        }

        return this.students.addResource(this.$scope.student).then(res => {
            this.$scope.student.id = res.headers('location').split("/").pop();
            return Promise.resolve(true);
        });
    }

    finishedWizard() {
        return this.$scope.group.enrollments.addResource(Object.assign({},
            this.$scope.enrollment, {student: this.$scope.student.id}
        ));
    }
}

export default {
    controller: EnrollUnregisteredStudentComponentController,
    template: enrollUnregisteredStudentComponentTemplate
};