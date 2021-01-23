'use strict';

import angular from "angular";
import AngularRouteModule from 'angular-route';
import 'angular1-async-filter';
import NgStorageModule from 'ngstorage';
import 'angular-acl';

import sharedModule from "../shared/shared.module";
import fixturesModule from "../fixtures/fixtures.module";
import * as authenticationService from "./authentication.service";
import * as authorizationService from "./authorization.service";
import * as aDirective from "./a.directive";
import * as login from "./login.component";
import * as authenticationState from "./authentication-state.component";
import * as notAllowed from "./not-allowed.component";

/** Security module.
 *
 * Provide security features to the application (authentication, authorization)
 * and apply them as wide as possible. It implement all the components required
 * to realize the workflows associated to application security (login, etc.).
 *
 * Register the following directives:
 * * *appSecurityLogin* using {@link LoginComponent}
 * * *appSecurityAuthenticationState* using {@link AuthenticationStateComponent}
 * * *appSecurityNotAllowed* using {@link NotAllowedComponent}
 */
export default angular.module('app.security', [
    AngularRouteModule, 
    'asyncFilter', 
    NgStorageModule.name, 
    'mm.acl', 
    
    sharedModule.name,
    fixturesModule.name
])

// provide the authentication and authorization services
    .service('authentication', authenticationService.AuthenticationService)
    .service('authorization', authorizationService.AuthorizationService)

    .directive('a', aDirective.ADirective)

    // provide module components
    .component('appSecurityLogin', login.LoginComponent)
    .component('appSecurityAuthenticationState',
        authenticationState.AuthenticationStateComponent)
    .component('appSecurityNotAllowed', notAllowed.NotAllowedComponent)

    // configure routing to components provided by this module
    .config(function ($routeProvider) {
        'ngInject';

        $routeProvider
        // route /security/login to the login component
            .when('/security/login', {
                template: '<app-security-login></app-security-login>'
            })

            // route /security/not-allowed to the not-allowed component
            .when('/security/not-allowed', {
                template: '<app-security-not-allowed></app-security-not-allowed>'
            });
    })

    // apply security policies
    .run(function ($rootScope, $location, $route, authentication, authorization) {
        'ngInject';

        $rootScope.$on('$routeChangeStart', function (e, next) {

            let currentPath = $location.path();

            // do nothing for not defined routes, wait for fallback
            if (!next.originalPath) {
                return;
            }

            // do nothing for routes inside the security module.
            if (currentPath.startsWith('/security')) {
                return;
            }

            // redirect user to the Login component if not authenticated
            if (!authentication.getValue()) {
                $location.search({path: currentPath}).path('/security/login');
                return;
            }

            // redirect user to the NotAllowed component if not authorized
            if (!authorization.canRouteOrPath(next.originalPath, currentPath)) {
                $location.search({path: currentPath}).path('/security/not-allowed');
                return;
            }

            return undefined;
        });
    });
