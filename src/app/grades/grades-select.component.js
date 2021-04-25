"use strict";

import gradesSelectComponentTemplate from "./grades-select.component.html";

class GradesSelectComponentController {

    static $inject = ['$scope', 'courses'];

    constructor($scope, courses) {
        
        $scope.courses = courses;

        this.$scope = $scope;
    }

    /** Receive the observable provided by the group selector.
     *
     * @param {rx.Observable} observable Course selector observable.
     */
    onObservable(observable) {

        if (!observable) {
            return;
        }

        // subscribe to observable to update the $scope
        observable.subscribe(selector => {

            if (!selector) {
                return;
            }

            let [course, __, group] = selector;

            this.$scope.course = course;
            this.$scope.group = group;
        });
    }
}

export default {
    controller: GradesSelectComponentController,
    template: gradesSelectComponentTemplate
}