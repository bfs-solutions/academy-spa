"use strict";

import {CollectionService} from "./collection.service";
import {EnrollmentsService} from "./enrollments.service";
import {TeachingsService} from "./teachings.service";

export class GroupsService extends CollectionService {

    constructor($http) {
        "ngInject";

        super($http, "groups", arguments[1]);
    }

    mapResource(resource) {

        resource.enrollments = new EnrollmentsService(this.$http,
            resource._links['group-has-enrollments'].href);

        resource.teachings = new TeachingsService(this.$http,
            resource._links['group-has-teachings'].href);

        return resource;
    }
}