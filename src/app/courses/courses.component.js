"use strict";

import coursesComponentTemplate from "./courses.component.html";

class CoursesComponentController {

    constructor($scope, courses) {
        "ngInject";

        $scope.courses = courses;

        courses.subscribe(courses => {
            if (!courses) return;

            courses.forEach(course => {
                if (course.promote_to) {
                    course.promoteTo = courses.find(c => c.id === course.promote_to);
                }
            })
        });
    }
}

/** Courses component.
 *
 */
export default {
    controller: CoursesComponentController,
    template: coursesComponentTemplate
}