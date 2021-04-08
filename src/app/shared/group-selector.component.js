'use strict';

import * as rx from "rx";
import groupSelectorTemplate from "./group-selector.component.html";

class GroupSelectorController {

    static $inject = ['$scope', 'courses'];

    constructor($scope, courses) {
        $scope.courses = courses;

        this.observable = new rx.BehaviorSubject();
    }

    $onInit() {
        this.onObservable({observable: this.observable});
    }
}

export const GroupSelectorComponent = {
    controller: GroupSelectorController,
    template: groupSelectorTemplate,
    bindings: {
        onObservable: '&'
    }
};
