import { SignupComponent } from '../../signup/signup.component';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

let winston = require('winston');


export class User {
    constructor(
        public username: string,
        public password: string) { }
}

@Injectable()
export class AuthenticationService {

    private loggedIn: boolean = false;
    token: string;

    constructor(private http: Http) {
        this.token = localStorage.getItem('token');
     }



    login(user: User) {
        let body = JSON.stringify(user);
        console.log('In Service: login - user: ' + body);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post('http://localhost:4300/api/login', body, <RequestOptionsArgs>{ headers: headers, withCredentials: true })
            .map((res: Response) => {
                let data = res.json();
                this.token = data.token;
                console.log('Token? ' + this.token);
                localStorage.setItem('token', this.token);
            })
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
        localStorage.removeItem('token');
    }

    isLoggedIn() {
        console.log('IsLoggedIn?: ' + localStorage.getItem('token') + ' = ' + !!localStorage.getItem('token'));
        return !!localStorage.getItem('token');
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        winston.level = 'error';
        winston.log('error', error);
        return Observable.throw(error || "Server Error");
    }
}
