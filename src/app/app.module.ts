import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { UpgradeModule } from '@angular/upgrade/static';

import { SmartAcademyModule } from './smart-academy.module';

import { InstitutionsModule } from './institutions/institutions.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    UpgradeModule,

    InstitutionsModule
  ]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) { }

  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, [SmartAcademyModule.name], { strictDi: true });
  }
}