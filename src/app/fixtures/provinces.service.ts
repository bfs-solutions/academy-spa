import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CollectionService } from '../core/collection.service';
import { ProvinceResource } from './hal/province.resource';
import { Province } from './province';
import { CantonsService } from './cantons.service';

@Injectable({
  providedIn: 'root'
})
export class ProvincesService extends CollectionService<ProvinceResource, Province> {

  constructor(http: HttpClient) {
    super(http, 'provinces', '/fixtures/provinces.json');
  }

  mapResource(resource: ProvinceResource): Province {

    const province: Province = { ...(resource as any) };

    province.cantons = new CantonsService(this.http,
        (new URL(
          resource._links['province-has-cantons'].href, 
          this.path
        )).toString());

    return province;
}
}
