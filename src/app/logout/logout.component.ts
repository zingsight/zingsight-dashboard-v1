import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AuthenticationService, User} from '../shared/services/authentication.service';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    providers: [AuthenticationService]
})

export class LogoutComponent implements OnInit {

public user = new User('', '');

    constructor(private _userService: AuthenticationService, private _router: Router) {}

       ngOnInit() {
        // reset login status
        this._userService.logout();
    }

    logout() {
        this._userService.logout();
  }
}
