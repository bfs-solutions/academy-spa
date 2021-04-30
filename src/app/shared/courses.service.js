"use strict";

import {CollectionService} from "./collection.service";
import {EditionsService} from "./editions.service";
import {SubjectsService} from "./subjects.service";

export class CoursesService extends CollectionService {

    static $inject = ['$http', 'dateFilter'];

    constructor($http, dateFilter) {
        
        super($http, "courses");

        this.dateFilter = dateFilter;
    }

    mapResource(resource) {

        resource.editions = new EditionsService(this.$http,
            this.dateFilter,
            resource._links['course-has-editions'].href);

        resource.subjects = new SubjectsService(this.$http,
            resource._links['course-has-subjects'].href);

        return resource;
    }
}