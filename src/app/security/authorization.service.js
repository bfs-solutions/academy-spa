'use strict';

/** Provide user authorization capability checks */
export class AuthorizationService {

    constructor($route, AclService) {
        'ngInject';

        this.$route = $route;
        this.AclService = AclService;

        this.can = AclService.can.bind(AclService);

        // Attempt to load from web storage
        AclService.resume();
    }

    matchRoute(on, route) {
        let keys = route.keys,
            params = {};

        if (!route.regexp) {
            return null;
        }

        let m = route.regexp.exec(on);
        if (!m) {
            return null;
        }

        for (let i = 1, len = m.length; i < len; ++i) {
            let key = keys[i - 1];

            let val = m[i];

            if (key && val) {
                params[key.name] = val;
            }
        }
        return params;
    }

    getPathTemplate(path) {
        // console.log(this.$route.routes);

        for (let pathTemplate in this.$route.routes) {

            if (this.matchRoute(path, this.$route.routes[pathTemplate])) {
                return pathTemplate;
            }
        }

        return null;
    }

    canRouteOrPath(pathTemplate, path) {
        return this.AclService.can(pathTemplate.split('/').slice(1).join('/')) ||
            this.AclService.can(path.split('/').slice(1).join('/'));
    }

    canPath(path) {
        let pathTemplate;

        if (this.AclService.can(path.split('/').slice(1).join('/'))) {
            return true;
        }

        pathTemplate = this.getPathTemplate(path);

        if (!pathTemplate) {
            return false;
        }

        return this.AclService.can(pathTemplate.split('/').slice(1).join('/'));
    }
}
