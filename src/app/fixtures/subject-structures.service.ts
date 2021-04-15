import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { CollectionService } from "../core/collection.service";

@Injectable({
    providedIn: 'root'
})
export class SubjectStructuresService extends CollectionService {

    constructor(http: HttpClient) {
        super(http, 'subject-structures', '/fixtures/subject-structures.json');
    }
}