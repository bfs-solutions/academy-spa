import { EditionsService } from "./editions.service";
import { SubjectsService } from "./subjects.service";

/** Course */
export interface Course {
    
    /** Unique Identifier */
    id: number;

    /** Label */
    label: string;

    /** Course Editions observable */
    editions: EditionsService;

    subjects: SubjectsService;
}