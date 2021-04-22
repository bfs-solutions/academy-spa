import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { Institution } from '../institution';
import { InstitutionsService } from '../institutions.service';
import { DeleteModalComponent } from './delete-modal.component';

class InstitutionsMockService {
  deleteResource() {
    return of({});
  }
}

describe('institutions/DeleteModalComponent', () => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NgbModule ],
      providers: [
        NgbActiveModal,
        { provide: InstitutionsService, useClass: InstitutionsMockService }
      ],
      declarations: [ DeleteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteModalComponent);
    component = fixture.componentInstance;

    component.institution = {
      name: `some-random-name-${Math.random()}`
    } as Institution;

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
      component.institution
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
