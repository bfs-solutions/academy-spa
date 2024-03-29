
'use strict';

import * as rx from 'rx';

import finalGradesHostTemplate
    from './final-grades-host.component.html';

class FinalGradesHostController {

    static $inject = ['$scope', 'users'];

    constructor($scope, users) {
        this.$scope = $scope;

        $scope.halves = new rx.BehaviorSubject();
        $scope.enrollments = new rx.BehaviorSubject();
        $scope.subjects = new rx.BehaviorSubject();
        this.selectedSubjects = rx.BehaviorSubject();
        // this.components = rx.BehaviorSubject();

        $scope.options = {
            includeMeans: true,
            includeTeachers: true
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

    // /** Receive the observable provided by the group selector.
    //  *
    //  * @param {rx.Observable} observable Course selector observable.
    //  */
    // onPartialObservable(observable) {
    //
    //     if (!observable) {
    //         return;
    //     }
    //
    //     // subscribe to observable to update the $scope
    //     observable.subscribe(selector => {
    //
    //         if (!selector) {
    //             return;
    //         }
    //
    //         let [half, partial, halfIdx, partialIdx] = selector;
    //
    //         this.$scope.half = half;
    //         this.$scope.partial = partial;
    //         this.$scope.halfIdx = halfIdx;
    //         this.$scope.partialIdx = partialIdx;
    //     });
    // }

    /** Receive the observable provided by the multi subject selector.
     *
     * @param {rx.Observable} observable Multi subject selector observable.
     */
    onSubjectObservable(observable){
        this.selectedSubjects = observable;
    }

    // onComponentObservable(observable){
    //     if (!observable) {
    //         return;
    //     }
    //
    //     // subscribe to observable to update the $scope
    //     observable.subscribe(selector => {
    //
    //         if (!selector) {
    //             return;
    //         }
    //
    //         let [component, componentIdx] = selector;
    //
    //         this.$scope.component = component;
    //         this.$scope.componentIdx = componentIdx;
    //     });
    // }
}

export const FinalGradesHostComponent = {
    controller: FinalGradesHostController,
    template: finalGradesHostTemplate
};