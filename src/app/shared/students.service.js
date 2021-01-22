"use strict";

import {CollectionService} from "./collection.service";

export class StudentsService extends CollectionService {

    constructor($http) {
        "ngInject";

        super($http, "students", arguments[1]);
    }

    mapResource(resource){

        resource['birth_date'] = resource['birth_date'] ? new Date(resource['birth_date']) : null;

        return resource;
    }
}