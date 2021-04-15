import { Resource } from "../core/resource";
import { Cantons } from "./cantons";

export interface Province extends Resource {
    cantons: Cantons;
}