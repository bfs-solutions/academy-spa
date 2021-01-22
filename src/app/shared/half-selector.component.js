'use strict';

import * as rx from "rx";
import halfSelectorTemplate from "./half-selector.component.html";

class HalfSelectorController {

    constructor($scope) {
        'ngInject';

        this.observable = new rx.BehaviorSubject();

        this.$scope = $scope;
    }

    $onInit() {
        this.onObservable({observable: this.observable});
    }

    onNext() {
        this.observable.onNext([
            this.$scope.form.half,
            // this.$scope.form.partial,
            this.halves.indexOf(this.$scope.form.half),
            // this.$scope.form.half.partials.getValue()
            //   .indexOf(this.$scope.form.partial)
        ]);
    }
}

export const HalfSelectorComponent = {
    controller: HalfSelectorController,
    template: halfSelectorTemplate,
    bindings: {
        halves: '<',
        onObservable: '&'
    }
};
