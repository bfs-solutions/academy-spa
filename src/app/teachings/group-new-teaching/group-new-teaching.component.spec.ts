import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setAngularJSGlobal } from '@angular/upgrade/static';
import { BehaviorSubject } from 'rxjs';
import * as angular from 'angular';

setAngularJSGlobal(angular);

import { routeParamsToken, locationToken } from '../../ajs-upgraded-providers';
import { CoursesService } from '../../shared/courses.service';
import { GroupNewTeachingComponent } from './group-new-teaching.component';
import { UsersService } from '../../shared/users.service';

class CollectionMockService extends BehaviorSubject<any> {
  constructor() {
    super([]);
  }
}

describe('GroupNewTeachingComponent', () => {
  let component: GroupNewTeachingComponent;
  let fixture: ComponentFixture<GroupNewTeachingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupNewTeachingComponent ],
      providers: [
        { provide: routeParamsToken, useValue: {} },
        { provide: locationToken, useValue: {} },
        { provide: CoursesService, useClass: CollectionMockService },
        { provide: UsersService, useClass: CollectionMockService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupNewTeachingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
