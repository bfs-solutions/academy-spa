import { CollectionService } from "../core/collection.service";
import { Resource } from "../core/resource";

export interface Canton extends Resource {
    parishes: CollectionService;
}