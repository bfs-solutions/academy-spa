'use strict';

import enrollmentSelectorTemplate from "./enrollment-selector.component.html";

class EnrollmentSelectorController {

    all(selected) {
        this.enrollments.forEach(e => e.selected = selected);
    }
}

export const EnrollmentSelectorComponent = {
    controller: EnrollmentSelectorController,
    template: enrollmentSelectorTemplate,
    bindings: {
        enrollments: '<'
    }
};
