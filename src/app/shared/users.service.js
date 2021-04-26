"use strict";

import { environment } from "../../environments/environment";
import {CollectionService} from "./collection.service";
import {TeachingsService} from "./teachings.service";

/** User collection service.
 *
 * Provide access to the user collection on the Smart Academy server.
 */
export class UsersService extends CollectionService {

    static $inject = ['$http'];

    constructor($http) {
        
        super($http, "users", (new URL(
            '/users', 
            environment.academyApi
        )).toString());
    }

    mapResource(resource) {

        resource.teachings = new TeachingsService(this.$http,
            (new URL(
                resource._links['user-has-teachings'].href,
                this.path
            )).toString());

        return resource;
    }
}