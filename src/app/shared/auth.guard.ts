import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

//   constructor(private authService: AuthenticationService) {}
  constructor() {}

  canActivate() {
    console.log('CanActivateViaAuthGuard:canActivate');
    return true;
  }
};
