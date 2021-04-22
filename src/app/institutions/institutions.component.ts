import { Component, OnInit } from "@angular/core";

import { Institution } from "./institution";
import { InstitutionsService } from "./institutions.service";

@Component({
    selector: 'app-institutions',
    templateUrl: './institutions.component.html'
})
export class InstitutionsComponent implements OnInit {

    loading = false;
    institutions!: Institution[];

    constructor(protected institutionsService: InstitutionsService) {}

    ngOnInit() {
        this.loading = true;

        this.institutionsService.observable$.subscribe(
            institutions => this.institutions = institutions
        ).add(() => this.loading = false);
    }
}