/* jshint -W117, -W030 */

'use strict';

import * as rx from "rx";

class CollectionServiceMock extends rx.BehaviorSubject {

    constructor($q) {
        'ngInject';

        super([]);

        this.$q = $q;
    }

    updateResource() {
        return this.$q.resolve({status: 200});
    }

    retrieveCollection() {
    }
}

describe('institutions.edit-institution.component', function () {

    let element, $rootScope, $componentController, institutions;

    // Load the app.institutions module, which contains the directive
    beforeEach(angular.mock.module('app.institutions'));

    // mock the institutions service used by the component
    beforeEach(angular.mock.module(function ($provide) {
        $provide.service('institutions', CollectionServiceMock);
    }));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function (_$compile_, _$rootScope_, _$componentController_,
                                _institutions_) {

        $componentController = _$componentController_;

        $rootScope = _$rootScope_;

        institutions = _institutions_;

        // Compile a piece of HTML containing the directive
        element = _$compile_('<app-institutions-edit-institution></app-institutions-edit-institution>')(_$rootScope_);

        spyOn(_institutions_, 'updateResource').and.callThrough();
        spyOn(_institutions_, 'retrieveCollection').and.callThrough();

        // fire all the watches, so the scope expressions will be evaluated
        // $rootScope.$digest();
    }));

    it('Replaces the element with the appropriate content', function () {
        // Check that the compiled element contains the templated content
        expect(element.html()).toContain('Modificar Centro Educativo');
    });

    describe('institutions.EditInstitutionController', function () {
        it('controller submit() call institutions.updateResource() if form valid', function () {
            let $scope = $rootScope.$new();

            $scope.institutionForm = {$valid: true};

            let controller = $componentController('appInstitutionsEditInstitution', {$scope: $scope});

            controller.submit({province: {}, canton: {}, parish: {}});

            expect(institutions.updateResource).toHaveBeenCalled();
        });

        it('controller submit() set processing before promise resolve', function () {
            let $scope = $rootScope.$new();

            $scope.institutionForm = {$valid: true};

            let controller = $componentController('appInstitutionsEditInstitution', {$scope: $scope});

            controller.submit({province: {}, canton: {}, parish: {}});

            expect(controller.processing).toBe(true);
        });

        it('controller submit() unset processing after promise resolve', function () {
            let $scope = $rootScope.$new();

            $scope.institutionForm = {$valid: true};

            let controller = $componentController('appInstitutionsEditInstitution', {$scope: $scope});

            controller.submit({province: {}, canton: {}, parish: {}});

            $rootScope.$digest();

            expect(controller.processing).toBe(false);
        });
    });
});
