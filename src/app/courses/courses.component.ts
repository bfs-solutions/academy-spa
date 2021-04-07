"use strict";

import angular from "angular";
import coursesComponentTemplate from "./courses.component.html";
import { CoursesService } from '../shared/courses.service';

interface IScope extends angular.IScope {
    courses: any;
}

class CoursesComponentController {

    constructor($scope: IScope, courses: CoursesService) {
        "ngInject";

        $scope.courses = courses;

        courses.subscribe((courses: any[]) => {
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