'use strict';

import authenticationStateTemplate from "./authentication-state.component.html";

/** Authentication State component controller.
 *
 * Provide access to authentication state to the view.
 */
class AuthenticationStateController {

    static $inject = ['$scope', 'authentication'];

    constructor($scope, authentication) {
        $scope.authentication = authentication;
    }
}

/** Component providing authentication state and links to change it */
export const AuthenticationStateComponent = {
    controller: AuthenticationStateController,
    template: authenticationStateTemplate
};
