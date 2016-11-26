import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {AuthenticationService, User} from '../shared/services/authentication.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    providers: [AuthenticationService]
})

export class SignupComponent {

public user = new User('', '');

    constructor(private _userService: AuthenticationService, private _router: Router) {

    }

    signup() {
    /**
     * Innocent until proven guilty
     */
    // this.submitted = true;
    // this.errorDiagnostic = null;

    this._userService.signup(this.user).subscribe(data => {
      this._router.navigate(['/']);
        console.log('<<< USER SIGNED UP >>>');
    },
    error => {
        console.log('<<< ERROR SIGNING UP >>> : ' + error);
    //   this.submitted = false;
    //   this.errorDiagnostic = USER_STATUS_CODES[error.status] || USER_STATUS_CODES[500];
    });
  }

}