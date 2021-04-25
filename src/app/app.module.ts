import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';

import { SmartAcademyModule } from './smart-academy.module';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ],
})
export class AppModule {

  constructor(private upgrade: UpgradeModule) {}

  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, [SmartAcademyModule.name], { strictDi: true });
  }
}
