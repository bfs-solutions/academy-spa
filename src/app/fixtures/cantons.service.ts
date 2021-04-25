import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CollectionService } from '../core/collection.service';
import { Canton } from './canton';
import { CantonResource } from './hal/canton.resource';

export class CantonsService extends CollectionService<CantonResource, Canton> {

  constructor(http: HttpClient, path: string) { 
    super(http, 'cantons', path);
  }

  mapResource(resource: CantonResource): Canton {

    const canton: Canton = {...(resource as any) };

    canton.parishes = new CollectionService(this.http,
        'parishes', resource._links['canton-has-parishes'].href);

    return canton;
}
}
