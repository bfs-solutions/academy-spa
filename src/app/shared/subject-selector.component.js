'use strict';

import * as rx from "rx";

import subjectSelectorTemplate from "./subject-selector.component.html";

class SubjectSelectorController {

    static $inject = ['$scope'];

    constructor($scope) {
        this.observable = new rx.BehaviorSubject();

        this.$scope = $scope;
    }

    $onInit() {
        this.onObservable({observable: this.observable});
    }

    onNext() {
        this.observable.onNext([
            this.$scope.form.subject,
            this.subjects.indexOf(this.$scope.form.subject)
        ]);
    }
}

export const SubjectSelectorComponent = {
    controller: SubjectSelectorController,
    template: subjectSelectorTemplate,
    bindings: {
        subjects: '<',
        onObservable: '&'
    }
};
