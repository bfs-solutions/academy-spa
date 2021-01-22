"use strict";

import deleteEnrollmentTemplate from "./delete-enrollment.component.html";

class DeleteEnrollmentController {
    proceed() {
        this.resolve.enrollments.deleteResource(this.resolve.enrollment).then(
            () => this.close({$value: this.resolve.enrollment})
        )
    }
}

export const  DeleteEnrollmentComponent = {
    template: deleteEnrollmentTemplate,
    controller: DeleteEnrollmentController,
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    }
};