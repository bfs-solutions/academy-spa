
import enrollmentFormTemplate from './enrollment-form.template.html';

class EditEnrollmentController {

    constructor($scope){
        "ngInject";

        this.modeEdit = true;
        this.$scope = $scope;
    }

    submit(enrollment){
        this.$scope.$broadcast('show-errors-check-validity');

        this.processing = true;

        this.resolve.enrollments.updateResource(enrollment, {
            meet_requirements: enrollment.meet_requirements,
            is_repeat: enrollment.is_repeat,
            comming_from: enrollment.comming_from,
            observations: enrollment.observations
        }).then(
            (res) => {
                this.processing = false;

                if (200 > res.status || res.status > 299) {
                    this.$scope.error = `${res.statusText}: ${res.data.toString()}`;
                    return;
                }

                // force retrieval of students collection
                // this.students.retrieveCollection();

                this.close({$value: this.resolve.enrollment});
            },
            (err) => { this.$scope.error = err; this.processing = false; }
        );
    }
}

export const EditEnrollmentComponent = {
    controller: EditEnrollmentController,
    template: enrollmentFormTemplate,
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    }
};