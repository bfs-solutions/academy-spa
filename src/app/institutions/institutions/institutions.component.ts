import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Institution } from '../../shared/institution';
import { InstitutionsService } from '../../shared/institutions.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.sass']
})
export class InstitutionsComponent implements OnInit {

  constructor(protected modal: NgbModal, public institutionsService: InstitutionsService) { }

  ngOnInit(): void {
  }

  /** Open a modal dialog used to prevent the user mistakes.
     *
     * It prevent the user from deleting the institutions by mistake if
     * inadvertently click on the delete button.
     *
     * @param {Object} institution The institution instance to delete.
     * @return The modal instance.
     */
   openDeleteModal(institution: Institution) {
    const ref = this.modal.open(DeleteModalComponent);
    ref.componentInstance.institution = institution;
}

}
