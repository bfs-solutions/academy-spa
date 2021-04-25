import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CollectionService } from '../core/collection.service';
import { InstitutionResource } from './hal/institution.resource';
import { Institution } from './institution';

@Injectable({
  providedIn: 'root'
})
export class InstitutionsService extends CollectionService<InstitutionResource, Institution> {

  constructor(http: HttpClient) { 
    super(http, 'institutions');
  }

  mapResource(resource: InstitutionResource): Institution {

    const institution: Institution = { ...(resource as any) };

    institution.enrollments = new CollectionService(this.http,
        'enrollments',
        resource._links['institution-has-enrollments'].href);

    return institution;
}
}
