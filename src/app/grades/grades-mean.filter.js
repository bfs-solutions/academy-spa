'use strict';

export const GradesMeanFilter = ['$filter', function GradesMeanFilter($filter) {
    "ngInject";

    return function (grades, components, filter = null) {

        let gradeList = components.map(c => grades[c.id])
            .map(v => v !== null && v !== undefined ? v : 0);

        if(filter){
            gradeList = gradeList.map(g => $filter(filter)(g))
        }

        return gradeList.reduce((a, b) => a + b, 0) / gradeList.length;
    }
}];