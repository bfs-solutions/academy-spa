'use strict';

import loginTemplate from "./login.component.html";

/** Login component controller.
 *
 * Handle form submission and invoke authentication service.
 */
class LoginController {

    static $inject = ['$scope', '$location', '$routeParams', 'authentication', 'securityRules',
        'AclService'];

    constructor($scope, $location, $routeParams, authentication, securityRules,
                AclService) {
        this.$scope = $scope;
        this.$location = $location;
        this.$routeParams = $routeParams;
        this.authentication = authentication;
        this.AclService = AclService;

        // load security rules
        securityRules.observable$.subscribe(securityRules => {

            // discard initial invalid state
            if (!securityRules) {
                return;
            }

            let rules = {};

            /* transform the server representation of the ACL into the representation
             expected by AclService */
            securityRules.forEach(rule => rules[rule.role] = rule.allowed);

            AclService.setAbilities(rules);

            return undefined;
        });
    }

    $onInit() {
        this.$scope.processing = false;
    }

    submit() {

        this.$scope.$broadcast('show-errors-check-validity');

        if (!this.$scope.loginForm.$valid) {
            return;
        }

        this.$scope.processing = true;

        this.authentication.authenticate(
            this.$scope.user.login, this.$scope.user.password
        ).then(user => {

            (user.roles || ['user']).forEach(role =>
                this.AclService.attachRole(role)
            );

            // user login is used as role for user specific rules (like teaching)
            this.AclService.attachRole(user.login);

            /* if user has associated teaching collection then fetch collection
             and construct ACL rules based on teaching information. */
            if (user.teachings) {
                user.teachings.subscribe(teachings => {
                    if (!teachings) {
                        return;
                    }

                    teachings.forEach(teaching => {
                        this.AclService.addAbility(
                            user.login,
                            `grades/${teaching.group}/${teaching.subject}`
                        );

                        this.AclService.addAbility(
                            user.login,
                            `grades-qualitative/${teaching.group}/${teaching.subject}`
                        );
                    });
                });
            }

            this.$scope.processing = false;
            this.$location.search({}).path(this.$routeParams.path);
        }, err => {
            this.$scope.processing = false;
            this.$scope.error = err;
        });
    }
}

/** Component providing Login form and handling.
 *
 * It provide the Login form for the application and handle form submission by
 * using the authentication service to validate user credentials.
 */
export const LoginComponent = {
    template: loginTemplate,
    controller: LoginController
};
