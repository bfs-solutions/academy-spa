'use strict';

import angular from "angular";
import AngularRouteModule from 'angular-route';
import 'angular1-async-filter';
import AngularUIBootstrapModule from 'ui-bootstrap4';
import { downgradeComponent } from '@angular/upgrade/static';

import sharedModule from "../shared/shared.module";
import fixturesModule from "../fixtures/fixtures.module.ajs";
import * as deleteModal from "./delete-modal.component";
import * as newInstitution from "./new-institution.component";
import * as editInstitution from "./edit-institution.component";
import { InstitutionsComponent } from "./institutions.component";

/** Institutions module.
 *
 * Provide institutions management features to the application.
 *
 * Register the following directives:
 * * *appInstitutions* using {@link InstitutionsComponent}
 * * *appInstitutionsDeleteModal* using {@link DeleteModalComponent}
 * * *appInstitutionsNewInstitution* using {@link NewInstitutionComponent}
 * * *appInstitutionsEditInstitution* using {@link EditInstitutionComponent}
 */
export default angular.module('app.institutions', [
    AngularRouteModule, 
    'asyncFilter', 
    AngularUIBootstrapModule, 
    
    sharedModule.name,
    fixturesModule.name
])

    .directive('appInstitutions', downgradeComponent({
        component: InstitutionsComponent
    }))
    .component('appInstitutionsDeleteModal',
        deleteModal.DeleteModalComponent)
    .component('appInstitutionsNewInstitution',
        newInstitution.NewInstitutionComponent)
    .component('appInstitutionsEditInstitution',
        editInstitution.EditInstitutionComponent)

    .config(['$routeProvider', function ($routeProvider) {
        
        $routeProvider
            .when('/institutions', {
                template: '<app-institutions></app-institutions>'
            })

            .when('/institutions/_new', {
                template: `<app-institutions-new-institution></app-institutions-new-institution>`
            })

            .when('/institutions/:institution/_edit', {
                template: `<app-institutions-edit-institution></app-institutions-edit-institution>`
            });
    }]);
