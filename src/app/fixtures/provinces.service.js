'use strict';

import * as collectionService from "../shared/collection.service";
import * as cantonsService from "./cantons.service";

/** Provinces service.
 *
 * Provide access to the collection of provinces stored on the server.
 */
export class ProvincesService extends collectionService.CollectionService {

    constructor($http) {
        'ngInject';

        super($http, 'provinces', 'fixtures/provinces.json');
    }

    mapResource(resource) {

        resource.cantons = new cantonsService.CantonsService(this.$http,
            resource._links['province-has-cantons'].href);

        return resource;
    }
}
