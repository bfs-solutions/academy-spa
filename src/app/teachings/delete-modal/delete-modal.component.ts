import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Teaching } from '../../shared/teaching';
import { TeachingsService } from '../../shared/teachings.service';

@Component({
  selector: 'app-teachings-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.sass']
})
export class DeleteModalComponent {

  @Input() teaching!: Teaching;
  @Input() teachingsService!: TeachingsService;

  constructor(public activeModal: NgbActiveModal) { }

  proceed() {
    this.teachingsService.deleteResource(this.teaching).then(
        () => this.activeModal.close()
    )
  }

}
