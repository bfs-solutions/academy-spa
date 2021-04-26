"use strict";

import { environment } from "../../environments/environment";
import { CollectionService } from "./collection.service";
import { EnrollmentsService } from "./enrollments.service";
import { TeachingsService } from "./teachings.service";

export class GroupsService extends CollectionService {

    static $inject = ['$http'];

    constructor($http) {

        const path = arguments[1] || (new URL(
            '/groups',
            environment.academyApi
        )).toString();

        super($http, "groups", path);
    }

    mapResource(resource) {

        resource.enrollments = new EnrollmentsService(this.$http,
            (new URL(
                resource._links['group-has-enrollments'].href,
                this.path
            )).toString());

        resource.teachings = new TeachingsService(this.$http,
            (new URL(
                resource._links['group-has-teachings'].href,
                this.path
            )).toString());

        return resource;
    }
}