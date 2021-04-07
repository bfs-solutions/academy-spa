"use strict";

import angular from "angular";
import {CollectionService} from "./collection.service";
import {EditionsService} from "./editions.service";
import {SubjectsService} from "./subjects.service";

export class CoursesService extends CollectionService {

    constructor($http: angular.IHttpProvider, 
        protected dateFilter: angular.IFilterDate) {
        "ngInject";

        super($http, "courses");
    }

    mapResource(resource: any) {

        resource.editions = new EditionsService(this.$http,
            this.dateFilter,
            resource._links['course-has-editions'].href);

        resource.subjects = new SubjectsService(this.$http,
            resource._links['course-has-subjects'].href);

        return resource;
    }
}