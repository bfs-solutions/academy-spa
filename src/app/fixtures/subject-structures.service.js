'use strict';

import * as collectionService from "../shared/collection.service";
import * as cantonsService from "./cantons.service";

/** Provinces service.
 *
 * Provide access to the collection of provinces stored on the server.
 */
export class SubjectStructures extends collectionService.CollectionService {

    static $inject = ['$http'];

    constructor($http) {
        super($http, 'subject-structures', 'fixtures/subject-structures.json');
    }
}
