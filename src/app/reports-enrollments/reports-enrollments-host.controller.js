
'use strict';

import * as rx from 'rx';

/** Controller for the Host view of enrollments reports.
 */
export class ReportsEnrollmentsHostController {

  constructor($scope){
    'ngInject';

    this.$scope = $scope;

    $scope.enrollments = new rx.BehaviorSubject();
  }

  /** Receive the observable provided by the group selector.
   *
   * @param {rx.Observable} observable Course selector observable.
   */
  onGroupObservable(observable) {

    if (!observable) {
      return;
    }

    // subscribe to observable to update the $scope
    observable.subscribe(selector => {

      if (!selector) {
        return;
      }

      let [course, edition, group] = selector;

      this.$scope.course = course;
      this.$scope.edition = edition;
      this.$scope.group = group;

      /* subscribe to group enrollments so we can pass enrollments into
       enrollment selector */
      group.enrollments.subscribe(this.$scope.enrollments);
    });
  }
}
