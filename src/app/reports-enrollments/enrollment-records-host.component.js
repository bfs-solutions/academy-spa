
'use strict';

import * as reportsEnrollmentsHost from './reports-enrollments-host.controller';
import enrollmentRecordsHostTemplate
  from './enrollment-records-host.component.html';

export const EnrollmentRecordsHostComponent = {
  controller: reportsEnrollmentsHost.ReportsEnrollmentsHostController,
  template: enrollmentRecordsHostTemplate
};
