import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import {LoginComponent} from './login/login.component';

const routes: Route[] = [
  { path: 'dashboard', pathMatch: 'full', redirectTo: 'dashboard'},
  { path: 'login', component: LoginComponent},
  { loadChildren: 'app/dashboard/dashboard.module#DashboardModule', path: 'dashboard' },
  { loadChildren: 'app/profile/profile.module#ProfileModule', path: 'profile' },
  { loadChildren: 'app/login/login.module#LoginModule', path: 'login' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
  routes,
  {
    useHash: true
  }
);
