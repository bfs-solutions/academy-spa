import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Collection } from "./hal/collection";
import { Resource } from "./hal/resource";

/** Abstract collection service.
 *
 * Provide access to a REST collection on the Smart Academy server.
 */
export class CollectionService<T extends Resource, K = T> extends BehaviorSubject<K[]> {

    public loading = false;
    protected path: string;
    protected retrieved = false;

    constructor(protected http: HttpClient, protected name: string, path?: string) {
        super([]);

        this.path = path || `/${name}`;
    }

    

    subscribe(...args: any[]) {
        if (!this.retrieved) {
            this.retrieveCollection();
            this.retrieved = true;
        }

        return super.subscribe(...args);
    }

    retrieveCollection() {
        this.loading = true;

        this.http.get<Collection<{[collection: string]: T[]}>>(this.path)
            .subscribe(
                collection => this.next(collection._embedded[this.name]
                    .map(this.mapResource.bind(this))), 
                error => this.error(error)
            ).add(() => this.loading = false);
        
        return this;
    }

    retrieveResource(id: string) {
        return this.http.get<T>(`${this.path}/${id}`).pipe(
            map(resource => this.mapResource(resource))
        );
    }

    mapResource(resource: T): K {
        return resource as unknown as K;
    }

    addResource(resource: K) {
        return this.http.post(this.path, resource).pipe(
            tap(() => this.retrieveCollection(), error => this.error(error))
        );
    }

    updateResource(resource: T, changes: Partial<K>) {
        let patches = Object.keys(changes).map(attr => {
            return {op: "replace", path: `/${attr}`, value: (changes as any)[attr]}
        });

        return this.http.patch(resource._links.self.href, patches, {
            headers: {
                "Content-Type": "application/json-patch+json"
            }
        }).pipe(
            tap(() => this.retrieveCollection(), error => this.error(error))
        );
    }

    deleteResource(resource: T) {
        return this.http.delete(resource._links.self.href).pipe(
            tap(() => this.retrieveCollection(), error => this.error(error))
        );
    }
}