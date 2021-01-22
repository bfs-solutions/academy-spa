/* jshint -W117, -W030 */

'use strict';

import * as rx from "rx";

class CollectionServiceMock extends rx.BehaviorSubject {

    constructor($q) {
        'ngInject';

        super([]);

        this.$q = $q;
    }

    deleteResource() {
        return this.$q.resolve(true);
    }
}

describe('institutions.delete-modal.component', function () {

    let element, $rootScope, $componentController, institutions, $scope;

    // Load the app.institutions module, which contains the directive
    beforeEach(angular.mock.module('app.institutions'));

    // mock the institutions service used by the component
    beforeEach(angular.mock.module(function ($provide) {
        $provide.service('institutions', CollectionServiceMock);
        $provide.service('enrollments', CollectionServiceMock);
    }));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function (_$compile_, _$rootScope_, _$componentController_,
                                _institutions_, _enrollments_) {

        $componentController = _$componentController_;

        $rootScope = _$rootScope_;

        institutions = _institutions_;

        $scope = $rootScope.$new();

        $scope.resolve = {
            institution: {
                enrollments: _enrollments_
            }
        };

        // Compile a piece of HTML containing the directive
        element = _$compile_('<app-institutions-delete-modal resolve="resolve"></app-institutions-delete-modal>')($scope);

        spyOn(_institutions_, 'deleteResource').and.callThrough();
    }));

    it('Replaces the element with the appropriate content', function () {
        // Check that the compiled element contains the template content
        expect(element.html()).toContain('Atención');
    });

    describe('institutions.DeleteModalController', function () {
        it('controller proceed() call institutions.deleteResource() if form valid', function () {

            let controller = $componentController('appInstitutionsDeleteModal', {$scope: $scope});

            controller.resolve = {
                institution: {}
            };

            controller.proceed();

            expect(institutions.deleteResource).toHaveBeenCalled();
        });

        it('controller proceed() set deleting before promise resolve', function () {

            let controller = $componentController('appInstitutionsDeleteModal', {$scope: $scope});

            controller.resolve = {
                institution: {}
            };

            controller.proceed();

            expect(controller.deleting).toBe(true);
        });

        it('controller proceed() unset deleting after promise resolve', function () {

            let controller = $componentController('appInstitutionsDeleteModal', {$scope: $scope});

            // mock component bindings
            controller.resolve = {
                institution: {}
            };
            controller.close = () => null;

            controller.proceed();

            $rootScope.$digest();

            expect(controller.deleting).toBe(false);
        });

        it('controller proceed() call $ctrl.close() after promise resolve', function () {

            let controller = $componentController('appInstitutionsDeleteModal', {$scope: $scope});

            // mock component bindings
            controller.resolve = {
                institution: {}
            };
            controller.close = jasmine.createSpy('close');

            controller.proceed();

            $rootScope.$digest();

            expect(controller.close).toHaveBeenCalledWith({$value: controller.resolve.institution});
        });
    });
});
