"use strict";

import { environment } from "src/environments/environment";
import { CollectionService } from "./collection.service";
import { GroupsService } from "./groups.service";

export class EditionsService extends CollectionService {

    static $inject = ['$http', 'dateFilter'];

    constructor($http, dateFilter) {

        const path = arguments[2] || (new URL(
            '/editions',
            environment.academyApi
        )).toString();

        super($http, "editions", path);

        this.dateFilter = dateFilter;
    }

    mapResource(resource) {

        let dateStart = this.dateFilter(resource['date_start']),
            dateEnd = this.dateFilter(resource['date_end']);

        resource.label = `${dateStart}-${dateEnd}`;

        resource.groups = new GroupsService(this.$http,
            (new URL(
                resource._links['edition-has-groups'].href,
                this.path
            )).toString());

        return resource;
    }
}