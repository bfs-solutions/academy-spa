import { CantonsService } from "./cantons.service";

export interface Province {
    name: string;

    cantons: CantonsService;
}