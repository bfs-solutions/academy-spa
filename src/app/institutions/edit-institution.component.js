'use strict';

import institutionFormTemplate from "./institution-form.template.html";

class EditInstitutionController {

    constructor($scope, $location, $routeParams, institutions, provinces) {
        'ngInject';

        this.$scope = $scope;
        this.$location = $location;
        this.institutions = institutions;

        this.processing = false;
        this.modeEdit = true;

        $scope.form = {};
        $scope.provinces = provinces;

        let institutionId = parseInt($routeParams.institution);

        institutions.subscribe(institutions => {

            if (!institutions) {
                return;
            }

            this.institution = institutions.find(i => i.id === institutionId);

            if (!this.institution) {
                return;
            }

            $scope.$applyAsync(() => {
                $scope.form.name = this.institution.name;
                $scope.form.type = this.institution.type;
            });

            provinces.subscribe(provinces => {
                if (!provinces) {
                    return;
                }

                let province = provinces.find(p => p.name === this.institution.province);

                $scope.$applyAsync(() => {
                    $scope.form.province = province;
                });

                province.cantons.subscribe(cantons => {

                    if (!cantons) {
                        return;
                    }

                    let canton = cantons.find(c => c.name === this.institution.canton);

                    $scope.$applyAsync(() => {
                        $scope.form.canton = canton;
                    });

                    canton.parishes.subscribe(parishes => {
                        if (!parishes) {
                            return;
                        }

                        let parish = parishes.find(p => p.name === this.institution.parish);

                        $scope.$applyAsync(() => {
                            $scope.form.parish = parish;
                        });
                    });
                });
            });

        });
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

        this.institutions.updateResource(this.institution, institution).then(
            (res) => {
                this.processing = false;

                if (200 > res.status || res.status > 299) {
                    this.$scope.error = `${res.statusText}: ${res.data.toString()}`;
                    return;
                }

                // force retrieval of institutions collection
                this.institutions.retrieveCollection();

                this.$location.path('/institutions');
            },
            (err) => {
                this.$scope.error = err;
                this.processing = false;
            }
        );
    }
}

/** Component providing institution edition form handling and processing
 */
export const EditInstitutionComponent = {
    controller: EditInstitutionController,
    template: institutionFormTemplate
};
