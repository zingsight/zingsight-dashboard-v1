import { SignupComponent } from '../../signup/signup.component';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class User {
    constructor(
        public email: string,
        public password: string) { }
}

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(user: User) {
        console.log('In Service: login - user: ' + JSON.stringify(user));
        return this.http.post('http://localhost:4300/api/login', JSON.stringify(user))
            .map((response: Response) => {
                console.log('In Service Response: login: > ' + response);
                // login successful if there's a jwt token in the response

                // let user = response.json();
                // console.log('111111In Service: login - user: ' + JSON.stringify(user));
                // if (user && user.token) {
                //     // store user details and jwt token in local storage to keep user logged in between page refreshes

                //     console.log('222222In Service: login - user: ' + JSON.stringify(user));
                //     localStorage.setItem('currentUser', JSON.stringify(user));
                // }
            });
    }

    signup(user) {
        console.log('In Service: signup!');
        return this.http.post('http://localhost:4300/api/signup', JSON.stringify(user))
            .map((response: Response) => {
                console.log('In Service Response: signup');
                // login successful if there's a jwt token in the response
                let user = response.json();
                this.login(user);
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    isLoggedIn() {
        console.log('AuthenticationService:isLoggedIn');
        return true;
    }
}