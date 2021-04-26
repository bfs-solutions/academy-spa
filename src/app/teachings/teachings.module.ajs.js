"use strict";

import angular from "angular";
import AngularRouteModule from 'angular-route';
import { downgradeComponent } from "@angular/upgrade/static";

import sharedModule from "../shared/shared.module.ajs";
import { GroupTeachingsComponent } from "./group-teachings/group-teachings.component";
import { GroupNewTeachingComponent } from './group-new-teaching/group-new-teaching.component';

export default angular.module("smart-academy-teachings", [
    AngularRouteModule, 
    
    sharedModule.name
])

    .directive("saGroupTeachings", downgradeComponent({
        component: GroupTeachingsComponent
    }))
    .directive("saGroupNewTeaching", downgradeComponent({
        component: GroupNewTeachingComponent
    }))

    .config(['$routeProvider', function ($routeProvider) {
        
        $routeProvider

            .when('/courses/:course/editions/:edition/groups/:group/teachings', {
                template: '<sa-group-teachings></sa-group-teachings>'
            })

            .when('/courses/:course/editions/:edition/groups/:group/teachings/_new', {
                template: '<sa-group-new-teaching></sa-group-new-teaching>'
            });
    }]);