import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class SharedModule { }
