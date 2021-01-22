"use strict";

import {CollectionService} from "./collection.service";
import {SubjectsService} from "./subjects.service";
import {UsersService} from "./users.service";

export class TeachingsService extends CollectionService {

    constructor($http) {
        "ngInject";

        super($http, "teachings", arguments[1]);
    }

    mapResource(resource) {

        (new SubjectsService(this.$http)).retrieveResource(resource.subject).then(
            subject => resource.subjectObj = subject
        );

        (new UsersService(this.$http)).retrieveResource(resource.user).then(
            user => resource.userObj = user
        );

        return resource;
    }
}