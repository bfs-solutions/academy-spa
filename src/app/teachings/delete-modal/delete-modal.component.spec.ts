import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DeleteModalComponent } from './delete-modal.component';

describe('teachings/DeleteModalComponent', () => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FontAwesomeModule ],
      declarations: [ DeleteModalComponent ],
      providers: [ NgbActiveModal ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteModalComponent);
    component = fixture.componentInstance;

    component.teaching = {
      userObj: {},
      subjectObj: {}
    } as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
