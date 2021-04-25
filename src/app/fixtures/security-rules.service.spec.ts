import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SecurityRulesService } from './security-rules.service';

describe('fixtures/SecurityRulesService', () => {
  let service: SecurityRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SecurityRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
