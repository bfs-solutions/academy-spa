'use strict';

import * as collectionService from "./collection.service";

/** Intitutions service.
 *
 * Provide access to the collection of institutions stored on the server.
 */
export class IntitutionsService extends collectionService.CollectionService {

    constructor($http, path) {
    
        super($http, 'institutions', path);
    }

    mapResource(resource) {

        resource.enrollments = new collectionService.CollectionService(this.$http,
            'enrollments',
            resource._links['institution-has-enrollments'].href);

        return resource;
    }
}

/** Build a institutions collection service.
 *
 * This factory function produce another function suitable to be used as
 * AngularJS provider. The resulting function will create an instance of the
 * {@link IntitutionsService} class when called using the parameters provided
 * to this function.
 *
 * @param {String} [path=`/${name}`] Optional path to collection resource.
 * @return {Function} AngularJS provider for the service.
 */
export function factory(path) {

    return ['$http', function ($http) {
        
        return new IntitutionsService($http, path);
    }];
}
