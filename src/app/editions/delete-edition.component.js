"use strict";

import deleteEnrollmentTemplate from "./delete-edition.component.html";

class DeleteEnrollmentController {
    proceed() {
        this.resolve.editions.deleteResource(this.resolve.edition).then(
            () => this.close({$value: this.resolve.edition})
        )
    }
}

export const  DeleteEditionComponent = {
    template: deleteEnrollmentTemplate,
    controller: DeleteEnrollmentController,
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    }
};