"use strict";

import {CollectionService} from "./collection.service";
import {HalvesService} from "./halves.service";
import {TeachingsService} from "./teachings.service";

import * as subjectGradesCalculator
    from "./subject-grades-calculator";

export class SubjectsService extends CollectionService {

    static $inject = ['$http'];

    constructor($http) {
        
        super($http, "subjects", arguments[1]);
    }

    mapResource(resource) {

        resource.halves = new HalvesService(this.$http,
            resource._links['subject-has-halves'].href);

        resource.teachings = new TeachingsService(this.$http,
            resource._links['subject-has-teachings'].href);

        // add the subject grades calculator
        resource.gradesCalculator =
            new subjectGradesCalculator.SubjectGradesCalculator(resource);

        return resource;
    }
}