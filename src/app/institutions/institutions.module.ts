import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InstitutionsComponent } from "./institutions.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        InstitutionsComponent
    ],
    entryComponents: [
        InstitutionsComponent
    ]
})
export class InstitutionsModule {}