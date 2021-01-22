/* jshint -W117, -W030 */

'use strict';

describe('institutions.component', function () {

    let $rootScope, element, institutionsFixture = [
        {
            name: 'institution1', province: 'province3', canton: 'canton5',
            parish: 'parish7', type: 'type9'
        },
        {
            name: 'institution2', province: 'province4', canton: 'canton6',
            parish: 'parish8', type: 'type10'
        }
    ];

    // Load the app module, which contains the directive
    beforeEach(angular.mock.module('app.institutions'));

    // Compile component and fire digest cycle
    beforeEach(inject(function (_$compile_, _$rootScope_) {

        $rootScope = _$rootScope_;

        // Compile a piece of HTML containing the directive
        element = _$compile_('<app-institutions></app-institutions>')(_$rootScope_);

        // fire all the watches, so the scope expressions will be evaluated
        $rootScope.$digest();
    }));

    it('Replaces the element with the appropriate content', function () {
        // Check that the compiled element contains the templated content
        expect(element.html()).toContain('Centros Educativos');
    });

    it('shows the institution list', inject(function (institutions) {

        institutions.onNext(institutionsFixture);

        // fire all the watches, so the scope expressions will be evaluated
        $rootScope.$digest();

        institutionsFixture.forEach(i => {
            expect(element.html()).toContain(i.name);
        });
    }));

    it('shows institution province', inject(function (institutions) {

        institutions.onNext(institutionsFixture);

        // fire all the watches, so the scope expressions will be evaluated
        $rootScope.$digest();

        institutionsFixture.forEach(i => {
            expect(element.html()).toContain(i.province);
        });
    }));

    it('shows institution canton', inject(function (institutions) {

        institutions.onNext(institutionsFixture);

        // fire all the watches, so the scope expressions will be evaluated
        $rootScope.$digest();

        institutionsFixture.forEach(i => {
            expect(element.html()).toContain(i.canton);
        });
    }));

    it('shows institution parish', inject(function (institutions) {

        institutions.onNext(institutionsFixture);

        // fire all the watches, so the scope expressions will be evaluated
        $rootScope.$digest();

        institutionsFixture.forEach(i => {
            expect(element.html()).toContain(i.parish);
        });
    }));

    it('shows institution type', inject(function (institutions) {

        institutions.onNext(institutionsFixture);

        // fire all the watches, so the scope expressions will be evaluated
        $rootScope.$digest();

        institutionsFixture.forEach(i => {
            expect(element.html()).toContain(i.type);
        });
    }));
});
