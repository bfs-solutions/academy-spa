/* jshint -W117, -W030 */

'use strict';

describe('app.institutions', function () {

    // Load the app module
    beforeEach(angular.mock.module('app.institutions'));

    it('define app.institutions module', function () {
        angular.module('app.institutions');
    });

    it('should map /institutions route to the app-institutions component',
        inject(function ($route) {

            expect($route.routes['/institutions'].template)
                .toBe('<app-institutions></app-institutions>');
        }));

    it('should map /institutions/_new route to the app-institutions component',
        inject(function ($route) {

            expect($route.routes['/institutions/_new'].template)
                .toBe('<app-institutions-new-institution></app-institutions-new-institution>');
        }));

    it('should map /institutions/:institution/_edit route to the app-institutions component',
        inject(function ($route) {

            expect($route.routes['/institutions/:institution/_edit'].template)
                .toBe('<app-institutions-edit-institution></app-institutions-edit-institution>');
        }));

    it('provide appInstitutions component', inject(function ($injector) {
        expect($injector.has('appInstitutionsDirective')).toBe(true);
    }));

    it('provide appInstitutionsDeleteModal component', inject(function ($injector) {
        expect($injector.has('appInstitutionsDeleteModalDirective')).toBe(true);
    }));

    it('provide appInstitutionsNewInstitution component', inject(function ($injector) {
        expect($injector.has('appInstitutionsNewInstitutionDirective')).toBe(true);
    }));

    it('provide appInstitutionsEditInstitution component', inject(function ($injector) {
        expect($injector.has('appInstitutionsEditInstitutionDirective')).toBe(true);
    }));
});
