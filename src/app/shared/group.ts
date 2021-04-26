import { TeachingsService } from "./teachings.service";

/** Student Group */
export interface Group {

    /** Unique Identifier */
    id: number;

    /** Label */
    label: string;

    teachings: TeachingsService;
}