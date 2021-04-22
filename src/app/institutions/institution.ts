import { Resource } from '../core/resource';

export interface Institution extends Resource {
    id: number;
    name: string;
    province: string;
    canton: string;
    parish: string;
    type: string;
}
