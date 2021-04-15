import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { CollectionService } from "../core/collection.service";

@Injectable({
    providedIn: 'root'
})
export class InstitutionsService extends CollectionService {

    constructor(http: HttpClient) {
        super(http, 'institutions', 'institutions');
    }
}