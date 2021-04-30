"use strict";

import gradesComponentTemplate from "./grades.component.html";

class GradesComponentController {

    static $inject = ['$scope', '$routeParams', 'courses', 'editions', 'groups', 'subjects'];

    constructor($scope, $routeParams, courses, editions, groups, subjects) {
        
        $scope.editNote = false;
        $scope.saving = false;

        groups.retrieveResource($routeParams.group).then(group => {
            $scope.group = group;

            editions.retrieveResource(group.edition).then(edition => {
                $scope.edition = edition;
            }, err => this.$scope.error = err);

            this.findEnrollments(group);
        }, err => this.$scope.error = err);

        subjects.retrieveResource($routeParams.subject).then(subject => {
            $scope.subject = subject;

            courses.retrieveResource(subject.course).then(course => {
                $scope.course = course;
            }, err => this.$scope.error = err)
        }, err => this.$scope.error = err);

        this.$scope = $scope;
    }

    activateGradeEdition(){
        this.$scope.editNote = !this.$scope.editNote;
    }

    findEnrollments(group) {

        group.enrollments.subscribe(enrollments => {
            if (!enrollments) return;

            group.enrollmentsObj = enrollments;

            enrollments.forEach(enrollment => {

                enrollment.disabled = {};
                enrollment.gradesObj = {};

                enrollment.grades.subscribe(grades => {

                    if (!grades) return;

                    grades.forEach(grade => {
                        enrollment.disabled[grade.component] = true;
                        enrollment.gradesObj[grade.component] = parseFloat(grade.value);
                    })
                }, err => this.$scope.error = err);
            });
        }, err => this.$scope.error = err)
    }

    getEvaluations(partial) {

        partial.componentsObj = [];
        partial.evaluationsObj = [];

        partial.components.subscribe(components => {
            if (!components) return;

            partial.componentsObj = components;
        }, err => this.$scope.error = err);
    }

    gradeIsModified(enrollment, componentId){
        return enrollment.grades.getValue()
                .find(g => g.component === componentId)
                .value !== enrollment.gradesObj[componentId];
    }

    save() {
        this.$scope.saving = true;
        let promise = Promise.resolve(true);
        this.$scope.group.enrollmentsObj.forEach(enrollment => {
            let tempEnrollment = enrollment.grades.getValue();
            Object.keys(enrollment.gradesObj).forEach(componentId => {

                // skip evaluations not part of the group been added/modified
                if(!this.$scope.form.partial.componentsObj.find(e => e.id == componentId)){
                    return;
                }

                if(!this.$scope.editNote)
                {
                    if (enrollment.disabled[componentId]) return;

                    if (enrollment.gradesObj[componentId] === null
                        || enrollment.gradesObj[componentId] === undefined) return;

                    console.log('registering addResource', enrollment.id, componentId, enrollment.gradesObj[componentId]);
                    promise = promise.then(() => {
                        console.log('executing addResource', enrollment.id, componentId, enrollment.gradesObj[componentId]);

                        enrollment.disabled[componentId] = true;

                        return enrollment.grades.addResource({
                            enrollment: enrollment.id,
							component: componentId,
                            value: enrollment.gradesObj[componentId]
                        })
                    })
                }
                else if(this.gradeIsModified(enrollment, parseInt(componentId)))
                {
                    let grade = enrollment.gradesObj[componentId];
                    console.log('registering updateResource', enrollment.id, componentId, grade);
                    promise = promise.then(() => {
                        enrollment.disabled[componentId] = true;

                        console.log('executing updateResource', enrollment.id, componentId, grade);
                        if(grade !== null && grade !== undefined && grade !== ''){
                            return enrollment.grades.updateResource(
                                tempEnrollment.find(g => g.component == componentId),
                                {value: grade}
                            );
                        }else{
                            return enrollment.grades.deleteResource(
                                tempEnrollment.find(g => g.component == componentId)
                            );
                        }

                    })
                }
            });
        });

        promise.then(() => {
            this.$scope.saving = false;
            this.$scope.editNote = false;
        }, (err) => {
            this.$scope.saving = false;
            this.$scope.error = err;
            this.$scope.editNote = false;
        });
    }
}

export default {
    controller: GradesComponentController,
    template: gradesComponentTemplate
};