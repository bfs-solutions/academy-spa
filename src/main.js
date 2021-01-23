"use strict";

import angular from "angular";

import { SmartAcademyModule } from "./app/smart-academy.module";

angular.bootstrap(document.body, [SmartAcademyModule.name], { strictDi: true });
