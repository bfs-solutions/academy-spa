import { CollectionService } from "../core/collection.service";
import { Resource } from "../core/hal/resource";

export interface Institution {
    enrollments: CollectionService<Resource, any>;
}