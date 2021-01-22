/* jshint -W117, -W030 */

'use strict';

class AuthenticationServiceMock {

    constructor($q) {
        'ngInject';

        this.$q = $q;
    }

    authenticate() {
        return this.$q.resolve({login: 'login', roles: []});
    }
}

describe('security.login.component', function () {

    let element, $rootScope, $componentController, $location, $routeParams;

    // Load the app module, which contains the directive
    beforeEach(angular.mock.module('app.security'));

    // mock the authentication service used by the component
    beforeEach(angular.mock.module(function ($provide) {
        $provide.service('authentication', AuthenticationServiceMock);

        $provide.value('$routeParams', {path: '/some/path'});
    }));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function (_$compile_, _$rootScope_, _authentication_,
                                _$componentController_, _$location_,
                                _$routeParams_) {

        $componentController = _$componentController_;

        $rootScope = _$rootScope_;

        $location = _$location_;

        $routeParams = _$routeParams_;

        // inject the authentication service into the root scope because it is
        // required by the LoginComponent
        $rootScope.authentication = _authentication_;

        // Compile a piece of HTML containing the directive
        element = _$compile_('<app-security-login></app-security-login>')($rootScope);

        spyOn($rootScope, '$broadcast').and.callThrough();

        spyOn(_authentication_, 'authenticate').and.callThrough();

        spyOn($location, 'path').and.callThrough();

        // fire all the watches, so the scope expressions will be evaluated
        $rootScope.$digest();
    }));

    it('Replaces the element with the appropriate content', function () {
        // Check that the compiled element contains the templated content
        expect(element.html()).toContain('Autentificación');
    });

    describe('security.LoginController', function () {
        it('controller submit() force the show of form errors', function () {
            let $scope = $rootScope.$new();

            $scope.loginForm = {$valid: false};

            let controller = $componentController('appSecurityLogin', {$scope: $scope});

            controller.submit();
            expect($rootScope.$broadcast)
                .toHaveBeenCalledWith('show-errors-check-validity');
        });

        it('controller submit() call authentication.authenticate() if form valid', function () {
            let $scope = $rootScope.$new();

            $scope.loginForm = {$valid: true};
            $scope.user = {
                login: null,
                password: null
            };

            let controller = $componentController('appSecurityLogin', {$scope: $scope});

            controller.submit();
            expect($rootScope.authentication.authenticate).toHaveBeenCalled();
        });

        it('controller submit() set processing before promise resolve', function () {
            let $scope = $rootScope.$new();

            $scope.loginForm = {$valid: true};
            $scope.user = {
                login: null,
                password: null
            };

            let controller = $componentController('appSecurityLogin', {$scope: $scope});

            controller.submit();

            expect($scope.processing).toBe(true);
        });

        it('controller submit() unset processing after promise resolve', function () {
            let $scope = $rootScope.$new();

            $scope.loginForm = {$valid: true};
            $scope.user = {
                login: null,
                password: null
            };

            let controller = $componentController('appSecurityLogin', {$scope: $scope});

            controller.submit();

            $rootScope.$digest();

            expect($scope.processing).toBe(false);
        });

        it('controller submit() call $location.path() after promise resolve', function () {
            let $scope = $rootScope.$new();

            $scope.loginForm = {$valid: true};
            $scope.user = {
                login: 'login',
                password: null
            };

            let controller = $componentController('appSecurityLogin', {$scope: $scope});

            controller.submit();

            $rootScope.$digest();

            expect($location.path).toHaveBeenCalledWith($routeParams.path);
        });
    });
});
