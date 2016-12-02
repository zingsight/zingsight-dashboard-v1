import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {DashboardComponent} from './dashboard/dashboard.component';

import {CanActivateViaAuthGuard} from './shared/auth.guard';

const routes: Route[] = [
  { path: 'dashboard', pathMatch: 'full',  component: DashboardComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'login', pathMatch: 'full', component: LoginComponent},
  { path: 'signup', pathMatch: 'full', component: SignupComponent},
  // { loadChildren: 'app/dashboard/dashboard.module#DashboardModule', path: 'dashboard' },
  { loadChildren: 'app/profile/profile.module#ProfileModule', path: 'profile' },
  { loadChildren: 'app/login/login.module#LoginModule', path: 'login' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
  routes,
  {
    useHash: true
  }
);
