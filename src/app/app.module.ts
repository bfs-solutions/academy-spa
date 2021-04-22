import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { UpgradeModule } from '@angular/upgrade/static';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { SmartAcademyModule } from './smart-academy.module';

import { InstitutionsModule } from './institutions/institutions.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    UpgradeModule,
    NgbModule,
    SharedModule,

    InstitutionsModule
  ]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule, iconLibrary: FaIconLibrary) {
    iconLibrary.addIconPacks(fas);
  }

  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, [SmartAcademyModule.name], { strictDi: true });
  }
}
