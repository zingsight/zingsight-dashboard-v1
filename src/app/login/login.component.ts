import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {AuthenticationService, User} from '../shared/services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [AuthenticationService]
})

export class LoginComponent {

public user = new User('', '');

    constructor(private _userService: AuthenticationService, private _router: Router) {

    }

    login() {
    /**
     * Innocent until proven guilty
     */
    // this.submitted = true;
    // this.errorDiagnostic = null;

    this._userService.login(this.user).subscribe(data => {
      this._router.navigate(['/']);
        console.log('<<< USER SIGNED IN >>>');
    },
    error => {
        console.log('<<< ERROR SIGNING IN >>>');
    //   this.submitted = false;
    //   this.errorDiagnostic = USER_STATUS_CODES[error.status] || USER_STATUS_CODES[500];
    });
  }

}