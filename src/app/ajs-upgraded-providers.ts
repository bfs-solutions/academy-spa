import { InjectionToken } from '@angular/core';
import * as angular from 'angular';
import 'angular-route';

import { CoursesService } from './shared/courses.service';
import { UsersService } from './shared/users.service';

export const routeParamsToken = new InjectionToken<angular.route.IRouteParamsService>('angular.route.$routeParams');

export function routeParamsServiceFactory(i: angular.auto.IInjectorService) {
    return i.get('$routeParams');
}

export const routeParamsServiceProvider = {
    provide: routeParamsToken,
    useFactory: routeParamsServiceFactory,
    deps: ['$injector']
};

export const locationToken = new InjectionToken<angular.ILocationService>('angular.$location');

export function locationServiceFactory(i: angular.auto.IInjectorService) {
    return i.get('$location');
}

export const locationServiceProvider = {
    provide: locationToken,
    useFactory: locationServiceFactory,
    deps: ['$injector']
};

export function coursesServiceFactory(i: angular.auto.IInjectorService) {
    return i.get('courses');
}

export const coursesServiceProvider = {
    provide: CoursesService,
    useFactory: coursesServiceFactory,
    deps: ['$injector']
};

export function usersServiceFactory(i: angular.auto.IInjectorService) {
    return i.get('users');
}

export const usersServiceProvider = {
    provide: UsersService,
    useFactory: usersServiceFactory,
    deps: ['$injector']
};