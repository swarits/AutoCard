import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { LoginnavComponent } from './components/login/loginnav/loginnav.component';
import { SignupPageComponent } from './components/login/signup-page/signup-page.component';
import { LoginPageComponent } from './components/login/login-page/login-page.component';
import { PassbookComponent } from './components/passbook/passbook.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { ManageCardsComponent } from './components/manage-cards/manage-cards.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { CardDialogComponent } from './components/manage-cards/card-dialog/card-dialog.component';
import { NewCardDialogComponent } from './components/manage-cards/new-card-dialog/new-card-dialog.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginnavComponent,
    SignupPageComponent,
    LoginPageComponent,
    PassbookComponent,
    TopNavComponent,
    ManageCardsComponent,
    NotificationsComponent,
    CardDialogComponent,
    NewCardDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    Ng4LoadingSpinnerModule.forRoot(),

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatMenuModule,

    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    HttpClientModule,

    MatSnackBarModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CardDialogComponent,
    NewCardDialogComponent
  ]
})
export class AppModule { }
