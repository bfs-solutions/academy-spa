import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { setAngularJSGlobal } from '@angular/upgrade/static';
import { BehaviorSubject } from 'rxjs';
import * as angular from 'angular';

setAngularJSGlobal(angular);

import { GroupTeachingsComponent } from './group-teachings.component';
import { routeParamsToken } from '../../ajs-upgraded-providers';
import { CoursesService } from '../../shared/courses.service';

class CoursesMockService extends BehaviorSubject<any> {
  constructor() {
    super([]);
  }
}

describe('teachings/GroupTeachingsComponent', () => {
  let component: GroupTeachingsComponent;
  let fixture: ComponentFixture<GroupTeachingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FontAwesomeModule ],
      declarations: [ GroupTeachingsComponent ],
      providers: [
        { provide: routeParamsToken, useValue: {} },
        { provide: CoursesService, useClass: CoursesMockService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTeachingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
