'use strict';

/** Directive for the anchor HTML element.
 *
 * It is used to enforce ACL rules on links (with href attribute or ng-link
 * attribute) in a transparent manner.
 *
 * @param authorization The authorization service used for ACL checks.
 * @returns {{restrict: string, priority: number, compile: compile}}
 * @constructor
 */
export const ADirective = ['authorization', function (authorization) {
    
    return {
        restrict: 'E',
        priority: 100,
        compile: function (elem, attr) {

            /* During compile phase we check permission for ng-click expression. This
             way we are capable to completely remove the click event handler. */

            if (attr.ngClick && !authorization.can(attr.ngClick)) {
                attr.$set('ngClick', '');
                attr.$set('disabled', true);
                elem.bind('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                });
            }

            return function (scope, elem, attr) {
                /* At post-link phase we check href permissions. Doing it at this
                 stage allow angular to render any expression inside the attribute
                 value allowing us to check permission on the actual path and the
                 route template. */

                if (!attr.href) {
                    return;
                }

                let path = attr.href.split('#!')[1];

                // skip this if not a locally routed path
                if (!path || path === '/') {
                    return;
                }

                // return early if user is allowed to access resource
                if (authorization.canPath(path)) {
                    return;
                }

                attr.$set('href', '');
                attr.$set('disabled', true);
                elem.bind('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                });
            };
        }
    };
}];
