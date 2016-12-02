import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate() {
    console.log('CanActivateViaAuthGuard:canActivate');
    if (this.authService.isLoggedIn()) {
        return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
};
