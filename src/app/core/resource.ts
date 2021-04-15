import { Link } from "./link";

/** HAL Resource */
export interface Resource {
    _links: {
        [rel: string]: Link;
    }
}