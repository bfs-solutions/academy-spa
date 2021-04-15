
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { CollectionService } from "../core/collection.service";

@Injectable({
    providedIn: 'root'
})
export class SecurityRulesService extends CollectionService {

    constructor(http: HttpClient) {
        super(http, 'securityRules', '/fixtures/security-rules.json');
    }
}