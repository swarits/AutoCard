import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { PassbookComponent } from './components/passbook/passbook.component';
import { ManageCardsComponent } from './components/manage-cards/manage-cards.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

const routes: Routes = [

  {path: '', component: LoginComponent},
  {path: 'passbook', component: PassbookComponent},
  {path: 'manage-cards', component: ManageCardsComponent},
  {path: 'notifications', component: NotificationsComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
