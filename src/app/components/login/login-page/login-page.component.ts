import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  hide = true;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  email_form_control = new FormControl('', [Validators.required, Validators.email]);
  password_form_control = new FormControl('', [Validators.required]);


  getEmailErrorMessage() {
    return this.email_form_control.hasError('email') ? 'Not a valid email' : '';
  }

  signIn() {
    //after success response from the backend
    this.router.navigateByUrl('/passbook');
  }
  
}
