'use strict';

import subjectHalfTemplateTemplate from "./subject-half-template.component.html";

export const SubjectHalfTemplateComponent = {
    template: subjectHalfTemplateTemplate,
    bindings: {
        course: '<',
        edition: '<',
        group: '<',
        halfIdx: '<',
        subject: '<'
    }
};
