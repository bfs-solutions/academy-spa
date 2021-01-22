/* jshint -W117, -W030 */

'use strict';

describe('security.not-allowed.component', function () {

    let element;

    // Load the app.security module, which contains the directive
    beforeEach(angular.mock.module('app.security'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function (_$compile_, _$rootScope_) {

        // Compile a piece of HTML containing the directive
        element = _$compile_('<app-security-not-allowed></app-security-not-allowed>')(_$rootScope_);

        // fire all the watches, so the scope expressions will be evaluated
        _$rootScope_.$digest();
    }));

    it('Replaces the element with the appropriate content', function () {
        // Check that the compiled element contains the templated content
        expect(element.html()).toContain('No permitido');
    });
});
