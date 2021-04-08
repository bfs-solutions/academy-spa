'use strict';

import * as rx from "rx";
import partialSelectorTemplate from "./partial-selector.component.html";

class PartialSelectorController {

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
            this.$scope.form.half,
            this.$scope.form.partial,
            this.halves.indexOf(this.$scope.form.half),
            this.$scope.form.half.partials.getValue()
                .indexOf(this.$scope.form.partial)
        ]);
    }
}

export const PartialSelectorComponent = {
    controller: PartialSelectorController,
    template: partialSelectorTemplate,
    bindings: {
        halves: '<',
        onObservable: '&'
    }
};
