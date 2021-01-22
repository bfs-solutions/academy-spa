'use strict';

import studentPartialReportTemplate from "./student-partial-report.component.html";
import * as studentCourseReportController
    from "../reports/student-course-report.controller";

export const StudentPartialReportComponent = {
    controller: studentCourseReportController.StudentCourseReportController,
    template: studentPartialReportTemplate,
    bindings: {
        course: '<',
        edition: '<',
        group: '<',
        halfIdx: '<',
        partialIdx: '<',
        enrollment: '<'
    }
};
