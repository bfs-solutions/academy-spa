'use strict';

import studentHalfReportTemplate from "./student-half-report.component.html";
import * as studentCourseReportController
    from "../reports/student-course-report.controller";

export const StudentHalfReportComponent = {
    controller: studentCourseReportController.StudentCourseReportController,
    template: studentHalfReportTemplate,
    bindings: {
        course: '<',
        edition: '<',
        group: '<',
        halfIdx: '<',
        enrollment: '<',
        includeMeans: '<'
    }
};
