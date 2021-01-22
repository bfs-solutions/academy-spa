/* jshint -W117, -W030 */

'use strict';

describe('app-security.module', function () {

    // Load the app.security module
    beforeEach(angular.mock.module('app.security'));

    it('define app.security module', function () {
        angular.module('app.security');
    });

    it('should map /security/login route to the app-security-login component',
        inject(function ($route) {
            expect($route.routes['/security/login'].template)
                .toBe('<app-security-login></app-security-login>');
        }));

    it('should map /security/not-allowed route to the app-security-not-allowed component',
        inject(function ($route) {
            expect($route.routes['/security/not-allowed'].template)
                .toBe('<app-security-not-allowed></app-security-not-allowed>');
        }));

    it('provide authentication', inject(function (authentication) {
        expect(authentication).toBeDefined();
    }));

    it('provide authorization', inject(function (authorization) {
        expect(authorization).toBeDefined();
    }));

    it('on $routeChangeStart redirect to the Login component if not' +
        ' authenticated', inject(function ($rootScope, $location, authentication) {
        let path = '/dashboard';

        authentication.onNext(false);

        $location.path(path);

        $rootScope.$broadcast('$routeChangeStart', {originalPath: path});

        $rootScope.$apply();

        expect($location.path()).toEqual('/security/login');
        expect($location.search().path).toEqual(path);
    }));

    it('on $routeChangeStart redirect to the Not Allowed component if not' +
        ' authorized', inject(function ($rootScope, $location, authentication,
                                        authorization) {
        let path = '/dashboard';

        authentication.onNext(true);
        authorization.can = () => false;

        $location.path(path);

        $rootScope.$broadcast('$routeChangeStart', {originalPath: path});

        $rootScope.$apply();

        expect($location.path()).toEqual('/security/not-allowed');
        expect($location.search().path).toEqual(path);
    }));

    it('provide appSecurityLogin component', inject(function ($injector) {
        expect($injector.has('appSecurityLoginDirective')).toBe(true);
    }));

    it('provide appSecurityAuthenticationState component', inject(function ($injector) {
        expect($injector.has('appSecurityAuthenticationStateDirective')).toBe(true);
    }));

    it('provide appSecurityNotAllowed component', inject(function ($injector) {
        expect($injector.has('appSecurityNotAllowedDirective')).toBe(true);
    }));
});
