"use strict";

import * as rx from "rx";
import promotionCertificatePageComponentTemplate from "./promotion-certificate-page.component.html";

class PromotionCertificatePageComponentController {

    constructor($scope, courses) {
        "ngInject";

        $scope.subjects = new rx.BehaviorSubject();
        this.selectedSubjects = rx.BehaviorSubject();
        $scope.enrollments = new rx.BehaviorSubject();

        this.$scope = $scope;

        // TODO transform this into a observer.do()
        courses.subscribe(courses => {
            if (!courses) return;

            courses.forEach(course => {
                if (course.promote_to) {
                    course.promoteTo = courses.find(c => c.id === course.promote_to);
                }
            })
        });
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

    /** Receive the observable provided by the multi subject selector.
     *
     * @param {rx.Observable} observable Multi subject selector observable.
     */
    onSubjectObservable(observable){
        this.selectedSubjects = observable;
    }
}

export default {
    controller: PromotionCertificatePageComponentController,
    template: promotionCertificatePageComponentTemplate
}