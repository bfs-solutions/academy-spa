import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { SmartAcademyModule } from './smart-academy.module';
import { 
  locationServiceProvider,
  routeParamsServiceProvider,
  coursesServiceProvider, 
  usersServiceProvider 
} from './ajs-upgraded-providers';
import { InstitutionsModule } from './institutions/institutions.module';
import { TeachingsModule } from './teachings/teachings.module';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,
    HttpClientModule,

    NgbModule,

    InstitutionsModule,
    TeachingsModule
  ],
  providers: [
    locationServiceProvider,
    routeParamsServiceProvider,
    coursesServiceProvider,
    usersServiceProvider
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
