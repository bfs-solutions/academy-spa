import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { InstitutionsService } from '../../shared/institutions.service';
import { InstitutionsComponent } from './institutions.component';

class InstitutionsMockService extends BehaviorSubject<any> {
  constructor() {
    super([]);
  }
}

describe('institutions/InstitutionsComponent', () => {
  let component: InstitutionsComponent;
  let fixture: ComponentFixture<InstitutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionsComponent ],
      providers: [
        { provide: InstitutionsService, useClass: InstitutionsMockService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
