import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { Collection } from "./collection";
import { Resource } from "./resource";

export class CollectionService<T=Resource> {

    observable$ = this.http.get<Collection>(this.endPoint).pipe(
        map(collection => collection._embedded[this.collectionName]
            .map(resource => this.mapResource(resource)))
    );

    constructor(protected http: HttpClient, 
                protected collectionName: string, 
                protected endPoint: string) {}

    /** Map resource into local representation */
    protected mapResource(resource: Resource): T {
        return resource as unknown as T;
    }
}