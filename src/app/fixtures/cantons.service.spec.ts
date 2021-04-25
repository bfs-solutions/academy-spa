import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CantonsService } from './cantons.service';

describe('fixtures/CantonsService', () => {
  let service: CantonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    const http = TestBed.inject(HttpClient);
    service = new CantonsService(http, '/some/path');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should mapResource() add parishes observable', () => {

    let resource = service.mapResource({
      name: 'some-name',
      _links: {
        self: {
          href: '/some/path'
        },
        'canton-has-parishes': {
          href: '/parishes'
        }
      }
    });

    expect(resource.parishes).toBeDefined();
  });
});
