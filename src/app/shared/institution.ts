import { CollectionService } from "../core/collection.service";
import { Resource } from "../core/hal/resource";

export interface Institution {
    name: string;

    enrollments: CollectionService<Resource, any>;
}