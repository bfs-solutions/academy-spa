'use strict';

import institutionFormTemplate from "./institution-form.template.html";

/** New institution component controller.
 *
 * Inject required services into the view.
 */
class NewInstitutionController {

    static $inject = ['$scope', '$location', 'provinces', 'institutions'];

    constructor($scope, $location, provinces, institutions) {
        $scope.provinces = provinces;

        this.$scope = $scope;
        this.$location = $location;
        this.institutions = institutions;

        this.processing = false;
        this.modeEdit = false;
    }

    submit(form) {

        this.$scope.$broadcast('show-errors-check-validity');

        if (!this.$scope.institutionForm.$valid) {
            return;
        }

        let institution = {
            name: form.name,
            province: form.province.name,
            canton: form.canton.name,
            parish: form.parish.name,
            type: form.type
        };

        this.processing = true;

        this.institutions.addResource(institution).subscribe(
            () => this.$location.path('/institutions'),
            err => this.$scope.error = err
        ).add(() => this.processing = false);
    }
}

/** Component providing new institution form handling and processing
 */
export const NewInstitutionComponent = {
    controller: NewInstitutionController,
    template: institutionFormTemplate
};
