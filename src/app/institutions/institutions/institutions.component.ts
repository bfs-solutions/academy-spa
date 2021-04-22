import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Institution } from '../institution';
import { InstitutionsService } from '../institutions.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
    selector: 'app-institutions',
    templateUrl: './institutions.component.html',
    styleUrls: ['./institutions.component.sass']
})
export class InstitutionsComponent implements OnInit {

    loading = false;
    institutions!: Institution[];

    constructor(protected modalService: NgbModal,
                protected institutionsService: InstitutionsService) {}

    ngOnInit() {
        this.loading = true;

        this.institutionsService.observable$.subscribe(
            institutions => this.institutions = institutions
        ).add(() => this.loading = false);
    }

    openDeleteModal(institution: Institution) {
        const ref = this.modalService.open(DeleteModalComponent);
        // set component inputs
        (ref.componentInstance as DeleteModalComponent)
            .institution = institution;

        ref.result.then(
            () => this.ngOnInit(),
            () => undefined
        );
    }
}
