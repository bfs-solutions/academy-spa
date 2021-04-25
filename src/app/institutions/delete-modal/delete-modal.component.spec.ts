import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, of } from 'rxjs';

import { InstitutionsService } from '../../shared/institutions.service';
import { DeleteModalComponent } from './delete-modal.component';

class InstitutionsMockService extends BehaviorSubject<any> {
  constructor() {
    super([]);
  }

  deleteResource() {
    return of({});
  }
}

describe('institutions/DeleteModalComponent', () => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteModalComponent ],
      providers: [ 
        NgbActiveModal,
        { provide: InstitutionsService, useClass: InstitutionsMockService } 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteModalComponent);
    component = fixture.componentInstance;

    component.institution = {
      enrollments: of([]) as any
    } as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click delete button call InstitutionsService.deleteResource with institution as argument',
      inject([InstitutionsService],
      fakeAsync((institutionsService: InstitutionsService) => {
    spyOn(institutionsService, 'deleteResource').and.callThrough();

    const button = fixture.debugElement.query(
      debugEl => debugEl.name === 'button' &&
        debugEl.nativeElement.textContent.includes('Eliminar')
    );

    button.triggerEventHandler('click', null);

    tick();

    fixture.detectChanges();
    expect(institutionsService.deleteResource).toHaveBeenCalledOnceWith(
      component.institution as any
    );
  })));

  it('should click delete button call NgbActiveModal.close after institution is deleted',
      inject([NgbActiveModal],
      fakeAsync((activeModal: NgbActiveModal) => {
    spyOn(activeModal, 'close').and.callThrough();

    const button = fixture.debugElement.query(
      debugEl => debugEl.name === 'button' &&
        debugEl.nativeElement.textContent.includes('Eliminar')
    );

    button.triggerEventHandler('click', null);

    tick();

    fixture.detectChanges();
    expect(activeModal.close).toHaveBeenCalled();
  })));
});
