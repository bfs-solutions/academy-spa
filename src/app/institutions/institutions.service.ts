import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { CollectionService } from "../core/collection.service";
import { Institution } from "./institution";

@Injectable({
    providedIn: 'root'
})
export class InstitutionsService extends CollectionService<Institution> {

    constructor(http: HttpClient) {
        super(http, 'institutions', 'institutions');
    }
}