'use strict';

import * as rx from "rx";

/** Provide user authentication capability as observable.
 *
 * It use the BASIC Authentication Strategy implemented by the REST API server
 * to check user credentials.
 *
 * Use the authenticate() method to change state if credentials are valid.
 */
export class AuthenticationService extends rx.BehaviorSubject {

    constructor($http, $sessionStorage, users) {
        'ngInject';

        // set initial authentication value using session state
        super(!!$sessionStorage.authentication);

        this.$http = $http;
        this.$sessionStorage = $sessionStorage;
        this.users = users;

        // set up default Authorization header if user is authenticated
        if (!!$sessionStorage.authentication) {
            let authorization = (new Buffer($sessionStorage.authentication))
                .toString('base64');

            $http.defaults.headers.common.Authorization =
                `Basic ${authorization}`;
        }
    }

    get login() {
        if (!this.$sessionStorage.authentication) {
            return undefined;
        }

        return this.$sessionStorage.authentication.split(':')[0];
    }

    /** Perform credential authentication using backend API server.
     *
     * @param {String} login User unique identifier.
     * @param {String} password User secret.
     */
    authenticate(login, password) {
        let authorization = (new Buffer(`${login}:${password}`)).toString('base64');

        this.$http.defaults.headers.common.Authorization = `Basic ${authorization}`;

        return this.users.retrieveResource(login)
            .then(res => {
                this.$sessionStorage.authentication = `${login}:${password}`;
                this.onNext(true);
                return res;
            });
    }
}
