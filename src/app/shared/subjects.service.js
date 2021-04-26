"use strict";

import { environment } from "../../environments/environment";
import { CollectionService } from "./collection.service";
import { HalvesService } from "./halves.service";
import { TeachingsService } from "./teachings.service";

import * as subjectGradesCalculator
    from "./subject-grades-calculator";

export class SubjectsService extends CollectionService {

    static $inject = ['$http'];

    constructor($http) {

        const path = arguments[1] || (new URL(
            '/subjects',
            environment.academyApi
        )).toString();

        super($http, "subjects", path);
    }

    mapResource(resource) {

        resource.halves = new HalvesService(this.$http,
            (new URL(
                resource._links['subject-has-halves'].href,
                this.path
            )).toString());

        resource.teachings = new TeachingsService(this.$http,
            (new URL(
                resource._links['subject-has-teachings'].href,
                this.path
            )).toString());

        // add the subject grades calculator
        resource.gradesCalculator =
            new subjectGradesCalculator.SubjectGradesCalculator(resource);

        return resource;
    }
}