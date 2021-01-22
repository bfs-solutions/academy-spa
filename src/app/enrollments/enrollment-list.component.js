"use strict";

import enrollmentListComponentTemplate from "./enrollment-list.component.html";

class EnrollmentListController {

    constructor($uibModal, FileSaver, Blob){
        "ngInject";

        this.$uibModal = $uibModal;
        this.FileSaver = FileSaver;
        this.Blob = Blob;
    }

    download(){
        let csv = [['Folio', 'Nombre', 'Repite', 'Cumple Requisitos'],
            ...this.enrollments.getValue().map(e => [
            e.id,
            e.studentObj.name,
            e.is_repeat ? 'Si' : 'No',
            e.meet_requirements ? 'Si' : 'No'
        ])].map(row => row.join(',')).join('\n');

        let blob = new this.Blob([csv], {
            type: "text/csv"
        });

        this.FileSaver.saveAs(blob, "Enrollments.csv");
    }

    /** Open modal window to edit enrollment */
    openEditModal(enrollment) {
        let modal = this.$uibModal.open({
            animation: true,
            component: 'sa-edit-enrollment',
            resolve: {
                enrollment: function () {
                    return enrollment;
                },
                enrollments: () => {
                    return this.enrollments;
                }
            }
        });
    }

    /** Open modal window to confirm enrollment deletion */
    openDeleteModal(enrollment) {
        let modal = this.$uibModal.open({
            animation: true,
            component: 'sa-delete-enrollment',
            resolve: {
                enrollment: function () {
                    return enrollment;
                },
                enrollments: () => {
                    return this.enrollments;
                }
            }
        });
    }
}

export default {
    controller: EnrollmentListController,
    template: enrollmentListComponentTemplate,
    bindings: {
        enrollments: '<'
    }
}