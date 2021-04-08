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

        this.institutions.addResource(institution).then(
            (res) => {
                this.processing = false;

                if (200 > res.status || res.status > 299) {
                    this.$scope.error = `${res.statusText}: ${res.data.toString()}`;
                    return;
                }

                this.$location.path('/institutions');
            },
            (err) => {
                this.$scope.error = err;
                this.processing = false;
            }
        );
    }
}

/** Component providing new institution form handling and processing
 */
export const NewInstitutionComponent = {
    controller: NewInstitutionController,
    template: institutionFormTemplate
};
