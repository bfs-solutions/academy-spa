import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Institution } from '../institution';
import { InstitutionsService } from '../institutions.service';

@Component({
  selector: 'app-institutions-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.sass']
})
export class DeleteModalComponent implements OnInit {

  blocked = false;
  deleting = false;
  error?: string;

  @Input() institution!: Institution;

  constructor(public activeModal: NgbActiveModal,
              protected institutionsService: InstitutionsService) { }

  ngOnInit(): void {
    // TODO: need to block deletion if there is enrollments associated to
    // the institution
  }

  proceed() {
    this.deleting = true;

    this.institutionsService.deleteResource(this.institution).subscribe(
      () => this.activeModal.close(),
      error => this.error = error
    )
      .add(() => this.deleting = false);
  }
}
