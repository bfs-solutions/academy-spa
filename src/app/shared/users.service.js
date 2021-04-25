"use strict";

import {CollectionService} from "./collection.service";
import {TeachingsService} from "./teachings.service";

/** User collection service.
 *
 * Provide access to the user collection on the Smart Academy server.
 */
export class UsersService extends CollectionService {

    static $inject = ['$http'];

    constructor($http) {
        
        super($http, "users");
    }

    mapResource(resource) {

        resource.teachings = new TeachingsService(this.$http,
            resource._links['user-has-teachings'].href);

        return resource;
    }
}