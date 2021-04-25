import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutionsComponent } from './institutions/institutions.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    InstitutionsComponent,
    DeleteModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    InstitutionsComponent
  ]
})
export class InstitutionsModule { }
