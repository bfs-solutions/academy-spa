import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProvincesService } from './provinces.service';

describe('fixtures/ProvincesService', () => {
  let service: ProvincesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProvincesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should mapResource() add cantons observable', () => {

    let resource = service.mapResource({
      name: 'some-name',
      _links: {
        self: {
          href: '/some/path'
        },
        'province-has-cantons': {
          href: '/cantons'
        }
      }
    });

    expect(resource.cantons).toBeDefined();
  });
});
