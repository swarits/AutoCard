import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  hide = true;
  hide2 = true;

  public lastname = null;

  constructor(private fb: FormBuilder, private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  email_form_control = new FormControl('', [Validators.required, Validators.email]);
  firstname_form_control = new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]);

  checkTns = false;

  matcher = new MyErrorStateMatcher();

  signupForm = this.fb.group({
    password: ['', [Validators.required]],
    confirmPassword: ['']
  }, { validator: this.checkPasswords })

  getEmailErrorMessage() {
    return this.email_form_control.hasError('email') ? 'Not a valid email' : '';
  }

  getNameErrorMessage() {
    return this.firstname_form_control.hasError('firstname') ? '' : 'First name must contain only characters';
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


  signUp() {
    let signupData = {
      "email": this.email_form_control.value,
      "firstname": this.firstname_form_control.value,
      "lastname": this.lastname,
      "user_password": this.signupForm.get("password").value,
      "user_matching_password": this.signupForm.get('confirmPassword').value
    }
    this.userService.signUp(signupData).subscribe(response => {
      if(response.status == 201){
        this.openSnackBar("You've successfully created the account.", "");
      }else {
        this.openSnackBar("Account Couldn't be created", " ");
      }
    },
    error => {
      if(error.status == 201){
        this.openSnackBar("You've successfully created the account.", "");
      }else {
        this.openSnackBar("Account Couldn't be created", " ");
      }
    }
    );
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}