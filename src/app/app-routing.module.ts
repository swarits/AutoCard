import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { PassbookComponent } from './components/passbook/passbook.component';
import { ManageCardsComponent } from './components/manage-cards/manage-cards.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AuthGuardService } from './auth-guard.service';
import { CookieService } from 'ngx-cookie-service';
import { SignupComponent } from './components/signup/signup.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [

  {path: '', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'passbook', component: PassbookComponent, canActivate: [AuthGuardService]},
  {path: 'manage-cards', component: ManageCardsComponent, canActivate: [AuthGuardService]},
  {path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuardService]},
  {path: 'reset-password', component: ResetPasswordComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService, CookieService]
})
export class AppRoutingModule { }
