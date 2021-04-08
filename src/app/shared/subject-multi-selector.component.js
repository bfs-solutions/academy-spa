'use strict';

import * as rx from "rx";

import subjectMultiSelectorTemplate from "./subject-multi-selector.component.html";

class SubjectMultiSelectorController {

    constructor(){
        this.observable = new rx.BehaviorSubject([]);
    }

    $onInit() {
        this.onObservable({observable: this.observable});

        this.subjects.subscribe(subjects => {
            if(!subjects){ return; }

            subjects.forEach(s => s.selected = true);

            this.onNext();
        });
    }

    all(selected) {
        this.subjects.getValue().forEach(e => e.selected = selected);

        this.onNext();
    }

    onNext(){
        this.observable.onNext(this.subjects.getValue().filter(s => s.selected));
    }
}

export const SubjectMultiSelectorComponent = {
    controller: SubjectMultiSelectorController,
    template: subjectMultiSelectorTemplate,
    bindings: {
        subjects: '<',
        onObservable: '&'
    }
};
