import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { routing } from './login.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [
    LoginComponent
  ],
  bootstrap: [
    LoginComponent
  ]
})
export class LoginModule {}
