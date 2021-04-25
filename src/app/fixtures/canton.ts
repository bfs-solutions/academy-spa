import { CollectionService } from "../core/collection.service";
import { Resource } from "../core/hal/resource";

export interface Canton {
    name: string;

    parishes: CollectionService<Resource, any>;
}