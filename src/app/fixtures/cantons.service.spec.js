/* jshint -W117, -W030, -W121 */

'use strict';

import * as cantonsService from "./cantons.service";

describe('CantonsService', function () {

    // Provide a factory for a service using the CantonsService class
    beforeEach(angular.mock.module(function ($provide) {
        $provide.service('cantons', ['$http', '$q', function ($http, $q) {
            return new cantonsService.CantonsService($http, $q);
        }]);
    }));

    it('mapResource() add parishes observable', inject(function (cantons) {

        let resource = cantons.mapResource({
            _links: {
                'canton-has-parishes': {
                    href: '/parishes'
                }
            }
        });

        expect(resource.parishes).toBeDefined();
    }));
});
