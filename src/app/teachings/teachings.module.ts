import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { GroupTeachingsComponent } from './group-teachings/group-teachings.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { GroupNewTeachingComponent } from './group-new-teaching/group-new-teaching.component';

@NgModule({
  declarations: [
    GroupTeachingsComponent,
    DeleteModalComponent,
    GroupNewTeachingComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TeachingsModule { }
