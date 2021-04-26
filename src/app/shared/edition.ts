import { GroupsService } from "./groups.service";

/** Course Edition */
export interface Edition {
    /** Unique Identifier */
    id: number;

    date_start: string;
    date_end: string;

    /** Groups observable */
    groups: GroupsService;
}