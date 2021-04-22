import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InstitutionsComponent } from './institutions/institutions.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        InstitutionsComponent,
        DeleteModalComponent
    ],
    entryComponents: [
        InstitutionsComponent
    ]
})
export class InstitutionsModule {}
