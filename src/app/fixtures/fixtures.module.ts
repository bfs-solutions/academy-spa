'use strict';

import angular from "angular";
import { downgradeInjectable } from "@angular/upgrade/static";

import * as collectionService from "../shared/collection.service";
import * as provincesService from "./provinces.service";
import { SubjectStructuresService } from "./subject-structures.service";

/** Fixtures module.
 *
 * Provide service to access fixture data shipped with the app.
 *
 * Register the following services:
 * * *provinces* using {@link ProvincesService}
 */
export default angular.module('app.fixtures', [])

    .service('securityRules', collectionService.factory(
        'securityRules', './fixtures/security-rules.json'))
    .service('provinces', provincesService.ProvincesService)

    .service('subjectStructures', downgradeInjectable(SubjectStructuresService));
