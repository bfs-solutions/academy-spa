"use strict";

import angular from "angular";
import AngularRouteModule from 'angular-route';
import AngularUIBootstrapModule from 'angular-ui-bootstrap';

import sharedModule from "../shared/shared.module";
import {NumberToWordsFilter} from "./number-to-words.filter";
import {BehaviourToWordsFilter} from "./behaviour-to-words.filter";
import * as numberToBehaviour from "./number-to-behaviour.filter";
import * as numberToProject from './number-to-project.filter';
import {WordsShorterFilter} from './words-shorter.filter';
import * as numberToGeBehaviour from "./number-to-ge-behaviour.filter";
import * as numberPad from "./number-pad.filter";

import reportsComponent from "./reports.component";
import promotionCertificateComponent from "./promotion-certificate.component";
import promotionCertificatePageComponent from "./promotion-certificate-page.component";

export default angular.module("smart-academy-reports", [
    AngularRouteModule, 
    AngularUIBootstrapModule, 
    
    sharedModule.name
])

    .filter("numberToWords", NumberToWordsFilter)
    .filter("behaviourToWords", BehaviourToWordsFilter)
    .filter("numberToBehaviour", numberToBehaviour.NumberToBehaviourFilter)
    .filter("behaviourToNumber", numberToBehaviour.BehaviourToNumberFilter)
    .filter("numberToProject", numberToProject.NumberToProjectFilter)
    .filter("projectToNumber", numberToProject.ProjectToNumberFilter)
    .filter("wordsShorter", WordsShorterFilter)
    .filter("numberToGeBehaviour", numberToGeBehaviour.NumberToGeBehaviourFilter)
    .filter("behaviourToGeNumber", numberToGeBehaviour.BehaviourToGeNumberFilter)
    .filter("numberPad", numberPad.NumberPadFilter)

    .component("saReports", reportsComponent)

    .component("saPromotionCertificate", promotionCertificateComponent)
    .component("saPromotionCertificatePage", promotionCertificatePageComponent)

    .config(function ($routeProvider) {
        "ngInject";

        $routeProvider
            .when('/reports', {
                template: '<sa-reports></sa-reports>'
            })

            .when('/reports/promotion-certificate', {
                template: '<sa-promotion-certificate-page></sa-promotion-certificate-page>'
            });
    });