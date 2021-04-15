import { Resource } from "./resource";

/** HAL Resource Collection */
export interface Collection extends Resource {
    _embedded: {
        [collection: string]: Resource[];
    }
}