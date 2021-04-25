import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Institution } from '../../shared/institution';
import { InstitutionsService } from '../../shared/institutions.service';

@Component({
  selector: 'app-institutions-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.sass']
})
export class DeleteModalComponent implements OnInit {

  public blocked = false;
  public deleting = false;
  public error?: Error;
  @Input() institution!: Institution;

  constructor(public activeModal: NgbActiveModal, 
              protected institutionsService: InstitutionsService) { }

  ngOnInit(): void {
    // prevent delete if the institution is associated to any enrollment
    this.institution.enrollments.subscribe((enrollments: any[]) => {
      if (!enrollments) {
        return;
      }

      this.blocked = enrollments.length !== 0;
    });
  }

  proceed() {
    this.deleting = true;

    this.institutionsService.deleteResource(this.institution as any).subscribe(
      () => this.activeModal.close(), 
      error => this.error = error
    ).add(() => this.deleting = false);
  }

}
