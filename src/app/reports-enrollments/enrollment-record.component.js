
'use strict';

import enrollmentRecordTemplate from './enrollment-record.component.html';

class EnrollmentRecordController {

  static $inject = ['institutions'];

  constructor(institutions){
    institutions.subscribe(institutions => {
      if(!institutions){ return; }

      this.enrollment.institutionObj = institutions.find(
        i => i.id === this.enrollment.institution);
    });
  }
}

export const EnrollmentRecordComponent = {
  controller: EnrollmentRecordController,
  template: enrollmentRecordTemplate,
  bindings: {
    edition: '<',
    enrollment: '<'
  }
};
