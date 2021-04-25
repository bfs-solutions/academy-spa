import { Resource } from "./resource";

export interface Collection<T extends {[collection: string]: Resource[]}> extends Resource {
    _embedded: T
}