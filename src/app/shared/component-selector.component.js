'use strict';

import * as rx from "rx";

import componentSelectorTemplate from "./component-selector.component.html";

class ComponentSelectorController {

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
            this.$scope.form.component,
            this.components.indexOf(this.$scope.form.component)
        ]);
    }
}

export const ComponentSelectorComponent = {
    controller: ComponentSelectorController,
    template: componentSelectorTemplate,
    bindings: {
        components: '<',
        onObservable: '&'
    }
};
