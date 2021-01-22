
'use strict';

import * as rx from "rx";

import subjectHalfReportHostTemplate
    from './subject-half-report-host.component.html';

class SubjectHalfReportHostController {

    constructor($scope, users) {
        'ngInject';

        this.$scope = $scope;

        $scope.halves = new rx.BehaviorSubject();
        $scope.enrollments = new rx.BehaviorSubject();
        $scope.subjects = new rx.BehaviorSubject();

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

            /*  subscribe to course subjects so we can pass halves into partial
             selector */
            course.subjects.subscribe(subjects => {

                if (!subjects || subjects.length === 0) {
                    return;
                }


                // search for teaching information for the subject in the context of
                // the group
                subjects.forEach(subject => {

                    if (subject.teaching) {
                        return;
                    }

                    subject.teachings.subscribe(teachings => {

                        if (!teachings) {
                            return;
                        }

                        let teaching = teachings.find(
                            t => t.group === this.$scope.group.id);

                        if (!teaching) {
                            return;
                        }

                        subject.teaching = teaching;

                        subject.user = this.users.getValue()
                            .find(u => u.login === teaching.user);

                    });
                });


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

    onSubjectObservable(observable) {

        if (!observable) {
            return;
        }

        // subscribe to observable to update the $scope
        observable.subscribe(selector => {

            if (!selector) {
                return;
            }

            let [subject, subjectIdx] = selector;

            this.$scope.subject = subject;
            this.$scope.subjectIdx = subjectIdx;
        });
    }
}

export const SubjectHalfReportHostComponent = {
    controller: SubjectHalfReportHostController,
    template: subjectHalfReportHostTemplate
};