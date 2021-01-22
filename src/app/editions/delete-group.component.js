"use strict";

import deleteGroupTemplate from "./delete-group.component.html";

class DeleteGroupController {
    proceed() {
        this.resolve.groups.deleteResource(this.resolve.group).then(
            () => this.close({$value: this.resolve.group})
        )
    }
}

export const  DeleteGroupComponent = {
    template: deleteGroupTemplate,
    controller: DeleteGroupController,
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    }
};