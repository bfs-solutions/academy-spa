
'use strict';

import enrollmentCertificateTemplate
  from './enrollment-certificate.component.html';
//
// class EnrollmentCertificateController {
//
//   constructor(){
//     'ngInject';
//   }
// }

export const EnrollmentCertificateComponent = {
  // controller: EnrollmentCertificateController,
  template: enrollmentCertificateTemplate,
  bindings: {
    course: '<',
    edition: '<',
    group: '<',
    enrollment: '<'
  }
};
