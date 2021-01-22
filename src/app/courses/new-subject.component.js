"use strict";

import newSubjectComponentTemplate from "./new-subject.component.html";

class NewSubjectComponentController {

    constructor($scope, $routeParams, $location, courses, subjectStructures) {
        "ngInject";

        let courseId = parseInt($routeParams.course);

        $scope.saving = false;
        $scope.progress = 0;
        $scope.steps = 0;


        courses.subscribe(courses => {
            if (!courses) return;

            $scope.course = courses.find(c => c.id === courseId);
        }, (err) => $scope.error = err);

        this.$scope = $scope;
        this.$location = $location;
        $scope.subjectStructures = subjectStructures;
    }

    submit(form) {

        this.$scope.$broadcast('show-errors-check-validity');

        if (!this.$scope.newSubjectForm.$valid) return;

        this.$scope.saving = true;

        // TODO: check subject labels do not repeat

        let promise = this.$scope.course.subjects.addResource(form)
            .then(this._handle$HttpResponse.bind(this))
            .then(() => this.retrieveSubjectIntoScope(form));

        this.$scope.steps += 2;

        form.structure.halves.forEach(half => {
            this.$scope.steps += 1;

            promise = promise
                .then(() => this.createHalve(half.label));
        });

        promise = promise.then(() => this.retrieveHalvesIntoScope());

        this.$scope.steps += 1;

        form.structure.halves.forEach(half => {
            half.partials.forEach(partial => {
                this.$scope.steps += 1;  

                promise = promise
                    .then(() => this.createPartial(half.label, partial.label));
            });
        });

        promise = promise.then(() => this.retrievePartialsIntoScope());

        this.$scope.steps += 1;  

        form.structure.halves.forEach(half => {
            half.partials.forEach(partial => {
                partial.components.forEach(component => {
                    this.$scope.steps += 1;

                    promise = promise
                        .then(() => this.createComponent(half.label,
                            partial.label, component.label));
                });
            });
        });

        promise.then(
            () => this.$location.path(`/courses/${this.$scope.course.id}/subjects`),
            (err) => {
                this.$scope.error = err;
                this.$scope.saving = false;
            }
        );
    }

    retrieveSubjectIntoScope(form) {
        return new Promise((resolve, reject) => {
            this.$scope.course.subjects.subscribe(subjects => {

                if (!subjects) return;

                let subject = subjects.find(s => s.label === form.label);

                if (!subject) return;

                this.$scope.subject = subject;

                // update progress information
                this.$scope.progress += (1 / this.$scope.steps) * 100;

                resolve();
            }, err => reject(err));
        });
    }

    createHalve(label) {
        return this.$scope.subject.halves.addResource({label: label})
            .then(this._handle$HttpResponse.bind(this));
    }

    retrieveHalvesIntoScope() {
        return new Promise((resolve, reject) => {
            this.$scope.subject.halves.subscribe(halves => {

                if (!halves) return;

                this.$scope.halves = halves;

                // update progress information
                this.$scope.progress += (1 / this.$scope.steps) * 100;
                
                resolve();
            }, err => reject(err));
        });
    }

    createPartial(halve, label) {
        return this.$scope.halves.find(h => h.label === halve)
            .partials.addResource({label: label})
            .then(this._handle$HttpResponse.bind(this));
    }

    retrievePartialsIntoScope() {
        return Promise.all(this.$scope.halves.map(half =>
            new Promise((resolve, reject) => {
                half.partials.subscribe(partials => {
                    if (!partials) return;

                    half.partialsObj = partials;

                    // update progress information
                    this.$scope.progress += (1 / this.$scope.steps) * 100;
                    
                    resolve();
                }, err => reject(err));
            })
        ));
    }

    createComponent(halve, partial, label) {
        return this.$scope.halves.find(h => h.label === halve)
            .partialsObj.find(p => p.label === partial)
            .components.addResource({label: label})
            .then(this._handle$HttpResponse.bind(this));
    }

    _handle$HttpResponse(res) {
        if (200 > res.status || res.status > 299) {
            throw new Error(`${res.statusText}: ${res.data.toString()}`);
        }

        // update progress information
        this.$scope.progress += (1 / this.$scope.steps) * 100;

        return true;
    }
}

export default {
    controller: NewSubjectComponentController,
    template: newSubjectComponentTemplate
};