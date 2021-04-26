"use strict";

import { environment } from "../../environments/environment";
import {CollectionService} from "./collection.service";
import {EditionsService} from "./editions.service";
import {SubjectsService} from "./subjects.service";

export class CoursesService extends CollectionService {

    static $inject = ['$http', 'dateFilter'];

    constructor($http, dateFilter) {
        
        super($http, "courses", (new URL(
            '/courses', 
            environment.academyApi
        )).toString());

        this.dateFilter = dateFilter;
    }

    mapResource(resource) {

        resource.editions = new EditionsService(this.$http,
            this.dateFilter,
            (new URL(
                resource._links['course-has-editions'].href, 
                this.path
            )).toString());

        resource.subjects = new SubjectsService(this.$http,
            (new URL(
                resource._links['course-has-subjects'].href,
                this.path
            )).toString());

        return resource;
    }
}