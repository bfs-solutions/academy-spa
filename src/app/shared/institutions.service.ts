import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { CollectionService } from '../core/collection.service';
import { InstitutionResource } from './hal/institution.resource';
import { Institution } from './institution';

@Injectable({
  providedIn: 'root'
})
export class InstitutionsService extends CollectionService<InstitutionResource, Institution> {

  constructor(http: HttpClient) { 
    super(http, 'institutions', (new URL(
      '/institutions', 
      environment.academyApi
    )).toString());
  }

  mapResource(resource: InstitutionResource): Institution {

    const institution: Institution = { ...(resource as any) };

    institution.enrollments = new CollectionService(this.http,
        'enrollments',
        (new URL(
          resource._links['institution-has-enrollments'].href,
          this.path
        )).toString());

    return institution;
  }
}
