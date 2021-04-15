
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Collection } from "../core/collection";

@Injectable({
    providedIn: 'root'
})
export class SecurityRulesService {

    observable$ = this.http.get<Collection>('/fixtures/security-rules.json').pipe(
        map(res => res._embedded['securityRules'])
    )

    constructor(protected http: HttpClient) {}
}