"use strict";

import {CollectionService} from "./collection.service";
import {PartialsService} from "./partials.service";

export class HalvesService extends CollectionService {

    static $inject = ['$http'];

    constructor($http) {
        
        super($http, "halfs", arguments[1]);
    }

    mapResource(resource) {

        resource.partials = new PartialsService(this.$http,
            resource._links['half-has-partials'].href);

        return resource;
    }
}