"use strict";

import deleteTeachingTemplate from "./delete-teaching.component.html";

class DeleteTeachingController {
    proceed() {
        this.resolve.teachings.deleteResource(this.resolve.teaching).then(
            () => this.close({$value: this.resolve.teaching})
        )
    }
}

export const  DeleteTeachingComponent = {
    template: deleteTeachingTemplate,
    controller: DeleteTeachingController,
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    }
};