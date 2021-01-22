/* jshint -W117, -W030 */

'use strict';

describe('security.authentication-state.component', function () {

    let $rootScope, element;

    // Load the app module, which contains the directive
    beforeEach(angular.mock.module('app.security'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {

        $rootScope = _$rootScope_;

        // Compile a piece of HTML containing the directive
        element = _$compile_('<app-security-authentication-state></app-security-authentication-state')($rootScope);

        // fire all the watches, so the scope expressions will be evaluated
        $rootScope.$digest();
    }));

    it('show login if user is authenticated', inject(function ($sessionStorage) {
        $sessionStorage.authentication = 'user123';

        // fire all the watches, so the scope expressions will be evaluated
        $rootScope.$digest();

        // Check that the compiled element contains the templated content
        expect(element.html()).toContain($sessionStorage.authentication);
    }));
});
