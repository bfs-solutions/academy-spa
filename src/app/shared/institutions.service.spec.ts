import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { InstitutionsService } from './institutions.service';

describe('shared/InstitutionsService', () => {
  let service: InstitutionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(InstitutionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
