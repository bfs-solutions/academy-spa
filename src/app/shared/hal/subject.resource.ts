import { Resource } from "../../core/hal/resource";

export interface SubjectResource extends Resource {
    id: number;

    label: string;

    qualitative: boolean;
}