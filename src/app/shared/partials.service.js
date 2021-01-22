"use strict";

import {CollectionService} from "./collection.service";

export class PartialsService extends CollectionService {

    constructor($http) {
        "ngInject";

        super($http, "partials", arguments[1]);
    }

    mapResource(resource) {

        resource.components = new CollectionService(this.$http,
            "components", resource._links['partial-has-components'].href);

        return resource;
    }
}