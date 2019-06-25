import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  hide = true;
  hide2 = true;

  public firstname=null;
  public lastname=null;
  public email = null;
  public user_password=null;
  public uer_user_matching_password=null;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

  }

  email_form_control = new FormControl('', [Validators.required, Validators.email]);
  firstname_form_control = new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]);

  checkTns=false;

  matcher = new MyErrorStateMatcher();

  signupForm = this.fb.group({
    password: ['', [Validators.required]],
    confirmPassword: ['']
  }, { validator: this.checkPasswords })

  getEmailErrorMessage() {
    return this.email_form_control.hasError('email') ? 'Not a valid email' : '';
  }

  getNameErrorMessage() {
    return this.firstname_form_control.hasError('firstname') ? '': 'First name must contain only characters';
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  signUp() {

  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}