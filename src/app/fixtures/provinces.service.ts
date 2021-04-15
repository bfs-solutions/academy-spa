
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { CollectionService } from "../core/collection.service";
import { Province } from "./province";
import { Resource } from "../core/resource";
import { Cantons } from "./cantons";

@Injectable({
    providedIn: 'root'
})
export class ProvincesService extends CollectionService<Province> {

    constructor(http: HttpClient) {
        super(http, 'provinces', '/fixtures/provinces.json');
    }

    protected mapResource(resource: Resource): Province {
        const province = resource as Province;

        province.cantons = new Cantons(this.http, 
            resource._links['province-has-cantons'].href);

        return province;
    }
}