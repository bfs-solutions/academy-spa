import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { InstitutionsService } from '../institutions.service';
import { InstitutionsComponent } from './institutions.component';

class InstitutionsMockService {

  get observable$() {
    return of([]);
  }
}

describe('institutions/InstitutionsComponent', () => {
  let component: InstitutionsComponent;
  let fixture: ComponentFixture<InstitutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbModule],
      providers: [
        { provide: InstitutionsService, useClass: InstitutionsMockService }
      ],
      declarations: [ InstitutionsComponent ]
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
