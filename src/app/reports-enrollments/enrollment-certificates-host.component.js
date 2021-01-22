
'use strict';

import * as reportsEnrollmentsHost from './reports-enrollments-host.controller';
import enrollmentCertificatesHostTemplate
  from './enrollment-certificates-host.component.html';

export const EnrollmentRecordsHostComponent = {
  controller: reportsEnrollmentsHost.ReportsEnrollmentsHostController,
  template: enrollmentCertificatesHostTemplate
};
