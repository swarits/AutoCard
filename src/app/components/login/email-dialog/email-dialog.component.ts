import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Ng4LoadingSpinnerComponent, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.css']
})
export class EmailDialogComponent implements OnInit {

  constructor(private userService: UserService,
    private snackBar: SnackBarService,
    private spinnerService: Ng4LoadingSpinnerService,
    private dialogRef: MatDialogRef<EmailDialogComponent>) { }

  ngOnInit() {
  }

  email_form_control = new FormControl('', [Validators.required, Validators.email]);

  resetPassword() {
    if (this.email_form_control != null) {
      this.spinnerService.show();
      this.userService.resetPasswordRequest(this.email_form_control.value).subscribe(response => {
        this.spinnerService.hide();
        this.dialogRef.close();
        this.snackBar.openSnackBar(response.message, "");
      }, error => {
        this.spinnerService.hide();
        this.snackBar.openSnackBar(error.error.message, "");
      }
      );
    }
  }
}
