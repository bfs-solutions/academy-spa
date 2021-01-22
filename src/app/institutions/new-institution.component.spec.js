/* jshint -W117, -W030 */

'use strict';

class CollectionServiceMock {

    constructor($q) {
        'ngInject';

        this.$q = $q;
    }

    addResource() {
        return this.$q.resolve(true);
    }
}

describe('institutions.new-institution.component', function () {

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
        element = _$compile_('<app-institutions-new-institution></app-institutions-new-institution>')(_$rootScope_);

        spyOn(_institutions_, 'addResource').and.callThrough();

        // fire all the watches, so the scope expressions will be evaluated
        // $rootScope.$digest();
    }));

    it('Replaces the element with the appropriate content', function () {
        // Check that the compiled element contains the templated content
        expect(element.html()).toContain('Nuevo Centro Educativo');
    });

    describe('institutions.NewInstitutionController', function () {
        it('controller submit() call institutions.addResource() if form valid', function () {
            let $scope = $rootScope.$new();

            $scope.institutionForm = {$valid: true};

            let controller = $componentController('appInstitutionsNewInstitution', {$scope: $scope});

            controller.submit({province: {}, canton: {}, parish: {}});

            expect(institutions.addResource).toHaveBeenCalled();
        });

        it('controller submit() set processing before promise resolve', function () {
            let $scope = $rootScope.$new();

            $scope.institutionForm = {$valid: true};

            let controller = $componentController('appInstitutionsNewInstitution', {$scope: $scope});

            controller.submit({province: {}, canton: {}, parish: {}});

            expect(controller.processing).toBe(true);
        });

        it('controller submit() unset processing after promise resolve', function () {
            let $scope = $rootScope.$new();

            $scope.institutionForm = {$valid: true};

            let controller = $componentController('appInstitutionsNewInstitution', {$scope: $scope});

            controller.submit({province: {}, canton: {}, parish: {}});

            $rootScope.$digest();

            expect(controller.processing).toBe(false);
        });
    });
});
