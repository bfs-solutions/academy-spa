'use strict';

import angular from "angular";
import { downgradeInjectable } from '@angular/upgrade/static';

import { SecurityRulesService } from './security-rules.service';
import { ProvincesService } from './provinces.service';
import { SubjectStructuresService } from './subject-structures.service';

/** Fixtures module.
 *
 * Provide service to access fixture data shipped with the app.
 *
 * Register the following services:
 * * *provinces* using {@link ProvincesService}
 */
export default angular.module('app.fixtures', [])

    .service('securityRules', downgradeInjectable(SecurityRulesService))
    .service('provinces', downgradeInjectable(ProvincesService))

    .service('subjectStructures', downgradeInjectable(SubjectStructuresService));
