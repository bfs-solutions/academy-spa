"use strict";

import {BehaviorSubject} from "rx";

/** Abstract collection service.
 *
 * Provide access to a REST collection on the Smart Academy server.
 */
export class CollectionService extends BehaviorSubject {

    constructor($http, name, path) {
        super();

        this.$http = $http;
        this.retrieved = false;
        this.name = name;
        this.path = path || `/${name}`;
    }

    subscribe(observer) {
        if (!this.retrieved) {
            this.retrieveCollection();
            this.retrieved = true;
        }

        return super.subscribe(observer);
    }

    retrieveCollection() {
        this.$http.get(this.path).then(
            res => this.onNext(res.data._embedded[this.name]
                .map(this.mapResource.bind(this))),
            err => this.onError(err)
        );

        return this;
    }

    retrieveResource(id) {
        return this.$http.get(`${this.path}/${id}`).then(
            resource => this.mapResource(resource.data)
        );
    }

    mapResource(resource) {
        return resource;
    }

    addResource(resource) {
        return this.$http.post(this.path, resource).then(
            (res) => {
                if (this.retrieved && 200 <= res.status && res.status <= 299) {
                    this.retrieveCollection();
                }

                return res;
            },
            err => {
                this.onError(err);
                return err
            }
        );
    }

    updateResource(resource, changes) {
        let patches = Object.keys(changes).map(attr => {
            return {op: "replace", path: `/${attr}`, value: changes[attr]}
        });

        return this.$http({
            method: 'PATCH',
            url: resource._links.self.href,
            data: JSON.stringify(patches),
            headers: {
                "Content-Type": "application/json-patch+json"
            }
        }).then(
            (res) => {
                if (this.retrieved && 200 <= res.status && res.status <= 299) {
                    this.retrieveCollection();
                }

                return res;
            },
            err => {
                this.onError(err);
                return err
            }
        );
    }

    deleteResource(resource) {
        return this.$http.delete(resource._links.self.href).then(
            (res) => {
                if (this.retrieved && 200 <= res.status && res.status <= 299) {
                    this.retrieveCollection();
                }

                return res;
            },
            err => {
                this.onError(err);
                return err
            }
        );
    }
}

export function factory(name, path) {

    return ['$http', function ($http) {
        
        return new CollectionService($http, name, path);
    }];
}