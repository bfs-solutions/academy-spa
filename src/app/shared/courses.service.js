"use strict";

import {CollectionService} from "./collection.service";
import {EditionsService} from "./editions.service";
import {SubjectsService} from "./subjects.service";

export class CoursesService extends CollectionService {

    constructor($http, dateFilter) {
        "ngInject";

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