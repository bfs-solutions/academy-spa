"use strict";

import angular from "angular";

import {CoursesService} from "./courses.service";
import {EditionsService} from "./editions.service";
import {GroupsService} from "./groups.service";
import {EnrollmentsService} from "./enrollments.service";
import {StudentsService} from "./students.service";
import {SubjectsService} from "./subjects.service";
import {UsersService} from "./users.service";
import * as institutionsService from "./institutions.service";
import * as gradesCalculatorService from "./grades-calculator.service";
import * as groupSelector from "./group-selector.component";
import * as halfSelector from "./half-selector.component";
import * as partialSelector from "./partial-selector.component";
import * as enrollmentSelector from "./enrollment-selector.component";
import * as subjectSelector from './subject-selector.component';
import * as subjectMultiSelector from './subject-multi-selector.component';
import * as componentSelector from "./component-selector.component";

import * as useFilter from './use-filter.filter';

export default angular.module("smart-academy-shared", [])

    .service("courses", CoursesService)
    .service("editions", EditionsService)
    .service("groups", GroupsService)
    .service("enrollments", EnrollmentsService)
    .service("students", StudentsService)
    .service("subjects", SubjectsService)
    .service("users", UsersService)
    .service('institutions', institutionsService.factory())

    .service('gradesCalculator', gradesCalculatorService.GradesCalculatorService)

    .filter('useFilter', useFilter.UseFilterFilter)

    .component('appGroupSelector',
        groupSelector.GroupSelectorComponent)

    .component('appHalfSelector',
        halfSelector.HalfSelectorComponent)

    .component('appPartialSelector',
        partialSelector.PartialSelectorComponent)

    .component('appEnrollmentSelector',
        enrollmentSelector.EnrollmentSelectorComponent)

    .component('appSubjectSelector',
        subjectSelector.SubjectSelectorComponent)

    .component('appSubjectMultiSelector',
        subjectMultiSelector.SubjectMultiSelectorComponent)

    .component('appComponentSelector',
        componentSelector.ComponentSelectorComponent);