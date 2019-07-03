import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private snackBar: SnackBarService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    private fb: FormBuilder
  ) { }

  showResetPrompt = false;
  hide = true;
  hide2 = true;
  email = null;

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      const email = params['email'];
      const token = params['token'];
      this.email = email;

      this.userService.resetPassword(email, token).subscribe(response => {
        this.showResetPrompt = true;
        this.snackBar.openSnackBar(response.message, "");
      }, error => {
        this.snackBar.openSnackBar(error.error.message, "");
        this.router.navigateByUrl('/login');
      });

    })
  }

  matcher = new MyErrorStateMatcher();

  signupForm = this.fb.group({
    password: ['', [Validators.required]],
    confirmPassword: ['']
  }, { validator: this.checkPasswords })

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }



  changePassword() {
    if (this.email != null) {
      this.spinnerService.show()
      let details = {
        "email": this.email,
        "password": this.signupForm.get("password").value
      }
      this.userService.changePassword(details).subscribe(response => {
        this.snackBar.openSnackBar(response.message, "");
        this.spinnerService.hide();
      }, error => {
        this.snackBar.openSnackBar(error.error.message, "");
        this.spinnerService.hide();
      });
      this.router.navigateByUrl('/login');
    }

  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
