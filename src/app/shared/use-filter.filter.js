
'use strict';

export function UseFilterFilter($filter) {
    "ngInject";

    return function() {
        var filterName = [].splice.call(arguments, 1, 1)[0];
        return $filter(filterName).apply(null, arguments);
    };
}