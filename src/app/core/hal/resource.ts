import { Link } from "./link";

/** Resource */
export interface Resource {

    /** links */
    _links: {
        /** self link */
        self: Link;

        [rel: string]: Link;
    }
}