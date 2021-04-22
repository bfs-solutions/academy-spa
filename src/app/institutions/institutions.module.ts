import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { InstitutionsComponent } from './institutions/institutions.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
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
