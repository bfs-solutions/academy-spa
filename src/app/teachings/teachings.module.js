"use strict";

import angular from "angular";
import AngularRouteModule from 'angular-route';
import 'angular1-async-filter';
import AngularUIBootstrapModule from 'ui-bootstrap4';

import sharedModule from "../shared/shared.module";
import groupTeachingsComponent from "./group-teachings.component";
import groupNewTeachingComponent from "./group-new-teaching.component";
import * as deleteTeaching from './delete-teaching.component';

export default angular.module("smart-academy-teachings", [
    AngularRouteModule, 
    'asyncFilter', 
    AngularUIBootstrapModule,
    
    sharedModule.name
])

    .component("saGroupTeachings", groupTeachingsComponent)
    .component("saGroupNewTeaching", groupNewTeachingComponent)
    .component('saDeleteTeaching', deleteTeaching.DeleteTeachingComponent)

    .config(['$routeProvider', function ($routeProvider) {
        
        $routeProvider

            .when('/courses/:course/editions/:edition/groups/:group/teachings', {
                template: '<sa-group-teachings></sa-group-teachings>'
            })

            .when('/courses/:course/editions/:edition/groups/:group/teachings/_new', {
                template: '<sa-group-new-teaching></sa-group-new-teaching>'
            });
    }]);