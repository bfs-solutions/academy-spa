import { Component, OnInit } from "@angular/core";
import { Resource } from "../core/resource";

import template from './institutions.component.html';
import { InstitutionsService } from "./institutions.service";

@Component({
    selector: 'app-institutions',
    template: `${template}`
})
export class InstitutionsComponent implements OnInit {

    loading = false;
    institutions!: Resource[];

    constructor(protected institutionsService: InstitutionsService) {}

    ngOnInit() {
        this.loading = true;

        this.institutionsService.observable$.subscribe(
            institutions => this.institutions = institutions
        ).add(() => this.loading = false);
    }
}