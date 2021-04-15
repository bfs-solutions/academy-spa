import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Collection } from "../core/collection";

@Injectable({
    providedIn: 'root'
})
export class SubjectStructuresService {

    observable$ = this.http.get<Collection>('/fixtures/subject-structures.json').pipe(
        map(res => res._embedded['subject-structures'])
    )

    constructor(protected http: HttpClient) {}
}