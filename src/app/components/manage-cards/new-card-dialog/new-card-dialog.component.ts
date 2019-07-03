import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-new-card-dialog',
  templateUrl: './new-card-dialog.component.html',
  styleUrls: ['./new-card-dialog.component.css']
})
export class NewCardDialogComponent implements OnInit {

  public cardType = null;

  constructor(private accountService: AccountService,
    private dialogRef: MatDialogRef<NewCardDialogComponent>,
    private snackBar: SnackBarService
  ) { }

  ngOnInit() {
  }

  cardNumber = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(16), Validators.minLength(16)]);
  name = new FormControl('', [Validators.required, Validators.pattern(/^[\sA-Za-z]+$/)]);
  expiryYear = new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]);
  cvv = new FormControl('',[Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.pattern(/^[0-9]+$/)]);
  expiryMonth = null;

  closeDialog() {
    this.dialogRef.close();
  }

  addCard() {
    // console.log(this.expiryMonth)
    // console.log(this.expiryYear.value)
    if(parseInt(this.expiryMonth)>new Date().getMonth() && parseInt(this.expiryYear.value)>=new Date().getFullYear()){
      let details = {
        "userId": window.localStorage.getItem("userId"),
        "cardNumber": this.cardNumber.value,
        "cardName": this.name.value,
        "cardType": this.cardType,
        "expiryDate": (this.expiryMonth +"/"+ this.expiryYear.value)
      }
      // console.log(details);
  
      this.accountService.addAccount(details)
        .subscribe(response => {
          this.snackBar.openSnackBar(response.message, "");
          this.closeDialog();
        }, error => {
          this.snackBar.openSnackBar(error.error.message, "");
        });
    }else {
      this.snackBar.openSnackBar("Enter valid expiry date.", "");
    }

  }

}
