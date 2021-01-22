"use strict";

import {CollectionService} from "./collection.service";
import {GroupsService} from "./groups.service";

export class EditionsService extends CollectionService {

    constructor($http, dateFilter) {
        "ngInject";

        super($http, "editions", arguments[2]);

        this.dateFilter = dateFilter;
    }

    mapResource(resource) {

        let dateStart = this.dateFilter(resource['date_start']),
            dateEnd = this.dateFilter(resource['date_end']);

        resource.label = `${dateStart}-${dateEnd}`;

        resource.groups = new GroupsService(this.$http,
            resource._links['edition-has-groups'].href);

        return resource;
    }
}