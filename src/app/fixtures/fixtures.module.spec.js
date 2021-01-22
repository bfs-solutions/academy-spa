/* jshint -W117, -W030 */

'use strict';

describe('app-fixtures.module', function () {

    // Load the app module
    beforeEach(angular.mock.module('app.fixtures'));

    it('define app.fixtures module', function () {
        angular.module('app.fixtures');
    });

    it('provide provinces', inject(function (provinces) {
        expect(provinces).toBeDefined();
    }));

    it('provide securityRules', inject(function (securityRules) {
        expect(securityRules).toBeDefined();
    }));
});
