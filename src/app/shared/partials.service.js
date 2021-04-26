"use strict";

import {CollectionService} from "./collection.service";

export class PartialsService extends CollectionService {

    static $inject = ['$http'];

    constructor($http) {
        
        super($http, "partials", arguments[1]);
    }

    mapResource(resource) {

        resource.components = new CollectionService(this.$http,
            "components", (new URL(
                resource._links['partial-has-components'].href,
                this.path
            )).toString());

        return resource;
    }
}