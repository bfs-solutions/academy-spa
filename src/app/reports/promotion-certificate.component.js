"use strict";

import promotionCertificateTemplate from "./promotion-certificate.component.html";
import * as studentCourseReportController from "./student-course-report.controller";

export default {
    controller: studentCourseReportController.StudentCourseReportController,
    template: promotionCertificateTemplate,
    bindings: {
        course: '<',
        edition: '<',
        group: '<',
        enrollment: '<'
    }
}