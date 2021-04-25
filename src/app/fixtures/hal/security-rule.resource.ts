import { Resource } from "../../core/hal/resource";
import { SecurityRule } from "../security-rule";

export interface SecurityRuleResource extends Resource, SecurityRule {}