/* jshint -W117, -W030, -W121 */

'use strict';

import * as provincesService from "./provinces.service";

describe('ProvincesService', function () {

    // Provide a factory for a service using the CantonsService class
    beforeEach(angular.mock.module(function ($provide) {
        $provide.service('provinces', provincesService.ProvincesService);
    }));

    it('mapResource() add cantons observable', inject(function (provinces) {

        let resource = provinces.mapResource({
            _links: {
                'province-has-cantons': {
                    href: '/cantons'
                }
            }
        });

        expect(resource.cantons).toBeDefined();
    }));
});
