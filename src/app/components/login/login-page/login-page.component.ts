import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  hide = true;
  constructor(private cookieService: CookieService, private router: Router, private userService: UserService, private snackbar: SnackBarService, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
  }

  email_form_control = new FormControl('', [Validators.required, Validators.email]);
  password_form_control = new FormControl('', [Validators.required]);


  getEmailErrorMessage() {
    return this.email_form_control.hasError('email') ? 'Not a valid email' : '';
  }

  signIn() {
    this.spinnerService.show();
    let signinData = {
      "email": this.email_form_control.value,
      "password": this.password_form_control.value
    }
    this.userService.signIn(signinData)
      .subscribe(response => {
        if (response.status == 200) {
          this.router.navigateByUrl('/passbook');
          this.snackbar.openSnackBar("Welcome to AutoCard", "");
          this.cookieService.set("session", "active");
        }
        this.spinnerService.hide();
      },
        error => {
          this.snackbar.openSnackBar("Login failed, Please try again!", "");
          this.spinnerService.hide();
        });

  }

}
