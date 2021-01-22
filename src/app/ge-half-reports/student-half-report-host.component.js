'use strict';

import * as rx from "rx";
import studentHalfReportHostTemplate from "./student-half-report-host.component.html";

class StudentHalfReportHostController {

    constructor($scope, users) {
        'ngInject';

        this.$scope = $scope;

        $scope.halves = new rx.BehaviorSubject();
        $scope.subjects = new rx.BehaviorSubject();
        this.selectedSubjects = rx.BehaviorSubject();
        $scope.enrollments = new rx.BehaviorSubject();
        $scope.options = {
            includeMeans: true
        };

        this.users = users;

        users.subscribe(() => null);
    }

    /** Receive the observable provided by the group selector.
     *
     * @param {rx.Observable} observable Course selector observable.
     */
    onGroupObservable(observable) {

        if (!observable) {
            return;
        }

        // subscribe to observable to update the $scope
        observable.subscribe(selector => {

            if (!selector) {
                return;
            }

            let [course, edition, group] = selector;

            this.$scope.course = course;
            this.$scope.edition = edition;
            this.$scope.group = group;

            course.subjects.subscribe(this.$scope.subjects);
            course.selectedSubjects = this.selectedSubjects;

            /*  subscribe to course subjects so we can pass halves into partial
             selector */
            course.subjects.subscribe(subjects => {

                if (!subjects || subjects.length === 0) {
                    return;
                }

                subjects[0].halves.subscribe(this.$scope.halves);
            });

            /* subscribe to group enrollments so we can pass enrollments into
             enrollment selector */
            group.enrollments.subscribe(this.$scope.enrollments);
        });
    }

    /** Receive the observable provided by the half selector.
     *
     * @param {rx.Observable} observable Half selector observable.
     */
    onHalfObservable(observable) {

        if (!observable) {
            return;
        }

        // subscribe to observable to update the $scope
        observable.subscribe(selector => {

            if (!selector) {
                return;
            }

            let [half, halfIdx] = selector;

            this.$scope.half = half;
            this.$scope.halfIdx = halfIdx;
        });
    }

    /** Receive the observable provided by the multi subject selector.
     *
     * @param {rx.Observable} observable Multi subject selector observable.
     */
    onSubjectObservable(observable){
        this.selectedSubjects = observable;
    }
}

export const StudentHalfReportHostComponent = {
    controller: StudentHalfReportHostController,
    template: studentHalfReportHostTemplate
};
