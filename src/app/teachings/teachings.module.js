"use strict";

import sharedModule from "../shared/shared.module";
import groupTeachingsComponent from "./group-teachings.component";
import groupNewTeachingComponent from "./group-new-teaching.component";
import * as deleteTeaching from './delete-teaching.component';

export default angular.module("smart-academy-teachings", [
    "ngRoute", "asyncFilter", "ui.bootstrap", sharedModule.name
])

    .component("saGroupTeachings", groupTeachingsComponent)
    .component("saGroupNewTeaching", groupNewTeachingComponent)
    .component('saDeleteTeaching', deleteTeaching.DeleteTeachingComponent)

    .config(function ($routeProvider) {
        "ngInject";

        $routeProvider

            .when('/courses/:course/editions/:edition/groups/:group/teachings', {
                template: '<sa-group-teachings></sa-group-teachings>'
            })

            .when('/courses/:course/editions/:edition/groups/:group/teachings/_new', {
                template: '<sa-group-new-teaching></sa-group-new-teaching>'
            });
    });