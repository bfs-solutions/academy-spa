"use strict";

import sharedModule from "../shared/shared.module";
import editionsComponent from "./editions.component";
import groupsComponent from "./groups.component";
import newEditionComponent from "./new-edition.component";

import * as deleteEdition from "./delete-edition.component";
import * as deleteGroup from './delete-group.component';

export default angular.module("smart-academy-editions", [
    "ngRoute", "asyncFilter", 'ui.bootstrap', sharedModule.name
])

    .component("saEditions", editionsComponent)
    .component("saGroups", groupsComponent)
    .component("saNewEdition", newEditionComponent)
    .component('saDeleteGroup', deleteGroup.DeleteGroupComponent)
    .component('saDeleteEdition', deleteEdition.DeleteEditionComponent)

    .config(function ($routeProvider) {
        "ngInject";

        $routeProvider

            .when('/courses/:course/editions', {
                template: '<sa-editions></sa-editions>'
            })

            .when('/courses/:course/editions/_new', {
                template: '<sa-new-edition></sa-new-edition>'
            })

            .when('/courses/:course/editions/:edition/groups', {
                template: '<sa-groups></sa-groups>'
            });
    });