/* jshint -W117, -W030 */

'use strict';

import * as authenticationService from "./authentication.service";

describe('app.security.AuthenticationService', function () {

    let $rootScope, $httpBackend, $sessionStorage, authentication, users;

    // Load the app module, which contains the directive
    beforeEach(angular.mock.module('app.security'));

    /* Provide authentication service using the
     authenticationService.AuthenticationService class */
    beforeEach(angular.mock.module(function ($provide) {
        $provide.value('$sessionStorage', {
            authentication: (new Buffer(`login:password`)).toString('base64')
        });

        $provide.service('authentication',
            authenticationService.AuthenticationService);
    }));

    beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$sessionStorage_,
                                _authentication_, _users_) {

        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $sessionStorage = _$sessionStorage_;
        authentication = _authentication_;
        users = _users_;

        spyOn(_users_, 'retrieveResource').and.callThrough();
    }));

    // A simple test to verify the Users service exists
    it('should exist', function () {
        expect(authentication).toBeDefined();
    });

    // A simple test to verify the Users service exists
    it('provide authenticate()', function () {
        expect(authentication.authenticate).toBeDefined();
    });

    it('authenticate() attempt to retrieve user resource', function () {
        let login = 'testUser';

        authentication.authenticate(login);

        expect(users.retrieveResource).toHaveBeenCalledWith(login);
    });

    it('authenticate() set correct default Authorization header', inject(function ($http) {
        let login = 'testUser', password = 'testPassword';
        let authorization = (new Buffer(`${login}:${password}`)).toString('base64');

        authentication.authenticate(login, password);

        expect($http.defaults.headers.common.Authorization).toEqual(`Basic ${authorization}`);
    }));

    it('initial value is true if $sessionStorage.authentication is set', function () {

        inject(function (authentication) {
            expect(authentication.getValue()).toBe(true);
        });
    });

    it('authenticate() set Authorization header value into session', function () {
        let login = 'login', password = 'password123';

        // Declare the endpoint we expect our service to hit and provide it with our mocked return values
        $httpBackend.expectGET('/users/login').respond(200);

        authentication.authenticate(login, password);

        $httpBackend.flush();
        $rootScope.$apply();

        expect($sessionStorage.authentication).toEqual(`${login}:${password}`);
    });

    it('authenticate() set login attribute', function () {
        let login = 'login', password = 'password123';

        // Declare the endpoint we expect our service to hit and provide it with our mocked return values
        $httpBackend.expectGET('/users/login').respond(200);

        authentication.authenticate(login, password);

        $httpBackend.flush();
        $rootScope.$apply();

        expect(authentication.login).toEqual(login);
    });

});
