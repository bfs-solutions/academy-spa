import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BehaviorSubject } from 'rxjs';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

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
      imports: [ FontAwesomeModule ],
      declarations: [ InstitutionsComponent ],
      providers: [
        { provide: InstitutionsService, useClass: InstitutionsMockService }
      ]
    })
    .compileComponents();

    TestBed.inject(FaIconLibrary).addIconPacks(fas);
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
