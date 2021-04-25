import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SubjectStructuresService } from './subject-structures.service';

describe('fixtures/SubjectStructuresService', () => {
  let service: SubjectStructuresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SubjectStructuresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
