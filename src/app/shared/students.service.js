"use strict";

import { environment } from "../../environments/environment";
import { CollectionService } from "./collection.service";

export class StudentsService extends CollectionService {

    static $inject = ['$http'];

    constructor($http) {

        const path = arguments[1] || (new URL(
            '/students',
            environment.academyApi
        )).toString();

        super($http, "students", path);
    }

    mapResource(resource) {

        resource['birth_date'] = resource['birth_date'] ? new Date(resource['birth_date']) : null;

        return resource;
    }
}