import { SignupComponent } from '../../signup/signup.component';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

var winston = require('winston');


export class User {
    constructor(
        public username: string,
        public password: string) { }
}

@Injectable()
export class AuthenticationService {

    private loggedIn: boolean = false;

    constructor(private http: Http) { }


    login(user: User) {
        let body = JSON.stringify(user);
        console.log('In Service: login - user: ' + body);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post('http://localhost:4300/api/login', body, <RequestOptionsArgs>{ headers: headers, withCredentials: true })
            .map((res: Response) => res)
            .catch(this.handleError);
    }

    signup(user: User) {
        let body = JSON.stringify(user);
        console.log('In Service: signup - user: ' + body);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post('http://localhost:4300/api/signup', body, <RequestOptionsArgs>{ headers: headers, withCredentials: true })
            .map((res: Response) => res)
            .catch(this.handleError);
    }

    logout() {
        // remove user from local storage to log user out
        this.loggedIn = false;
        // localStorage.removeItem('currentUser');
    }

    isLoggedIn() {
        console.log('AuthenticationService:isLoggedIn -- ' + this.loggedIn);
        return this.loggedIn;
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        winston.level = 'error';
        winston.log('error', error);
        return Observable.throw(error || "Server Error");
    }
}
