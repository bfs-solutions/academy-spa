import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';

import { SmartAcademyModule } from './smart-academy.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  
  constructor(
    private upgrade: UpgradeModule,
    private elRef: ElementRef
  ) {}

  ngOnInit() {
    this.upgrade.bootstrap(
      document.body, 
      [SmartAcademyModule.name], 
      { strictDi: true }
    );
  }


  ngOnDestroy() {
    this.upgrade.$injector.get('$rootScope').$destroy();
  }
}
