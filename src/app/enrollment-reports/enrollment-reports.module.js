"use strict";

import angular from "angular";
import AngularRouteModule from 'angular-route';
import 'angular1-async-filter';

import sharedModule from "../shared/shared.module";
import nominaDeMatriculadosComponent from "./nomina-de-matriculados.component";
import reporteResumen from "./reporte-resumen.component";
import controlDeAsistencia from "./control-de-asistencia.component";

export default angular.module("smart-academy-enrollment-reports", [
    AngularRouteModule, 
    "asyncFilter", 
    
    sharedModule.name
])

    .component("saNominaDeMatriculados", nominaDeMatriculadosComponent)

    .component("saReporteResumenPorCurso", reporteResumen)

    .component("saControlDeAsistencia", controlDeAsistencia)

    .config(function ($routeProvider) {
        "ngInject";

        $routeProvider
            .when('/courses/:course/editions/:edition/groups/:group/enrollment-report', {
                template: '<sa-nomina-de-matriculados></sa-nomina-de-matriculados>'
            })

            .when('/courses/:course/editions/:edition/groups/:group/reporte-resumen', {
                template: '<sa-reporte-resumen-por-curso></sa-reporte-resumen-por-curso>'
            })

            .when('/courses/:course/editions/:edition/groups/:group/control-de-asistencia', {
                template: '<sa-control-de-asistencia></sa-control-de-asistencia>'
            });
    });