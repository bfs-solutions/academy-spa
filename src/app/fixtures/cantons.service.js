'use strict';

import * as collectionService from "../shared/collection.service";

/** Cantons service.
 *
 * Provide access to the collection of cantons stored on the server.
 */
export class CantonsService extends collectionService.CollectionService {

    static $inject = ['$http', 'path'];

    constructor($http, path) {
        
        super($http, 'cantons', path);
    }

    mapResource(resource) {

        resource.parishes = new collectionService.CollectionService(this.$http,
            'parishes', resource._links['canton-has-parishes'].href);

        return resource;
    }
}
