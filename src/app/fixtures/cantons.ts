import { HttpClient } from "@angular/common/http";

import { CollectionService } from "../core/collection.service";
import { Resource } from "../core/resource";
import { Canton } from "./canton";

export class Cantons extends CollectionService<Canton> {

    constructor(http: HttpClient, endPoint: string) {
        super(http, 'cantons', endPoint);
    }

    protected mapResource(resource: Resource): Canton {
        const canton = resource as Canton;

        canton.parishes = new CollectionService(
            this.http, 'parishes', resource._links['canton-has-parishes'].href
        );

        return canton;
    }
}