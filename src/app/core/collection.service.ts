import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { Collection } from "./collection";

export abstract class CollectionService {

    observable$ = this.http.get<Collection>(this.endPoint).pipe(
        map(collection => collection._embedded[this.collectionName])
    );

    constructor(protected http: HttpClient, 
                protected collectionName: string, 
                protected endPoint: string) {}
}