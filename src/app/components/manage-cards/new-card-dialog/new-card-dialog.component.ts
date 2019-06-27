import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-card-dialog',
  templateUrl: './new-card-dialog.component.html',
  styleUrls: ['./new-card-dialog.component.css']
})
export class NewCardDialogComponent implements OnInit {

  public cardType = null;

  constructor(private accountService: AccountService, private dialogRef: MatDialogRef<NewCardDialogComponent>) { }

  ngOnInit() {
  }

  cardNumber = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]);
  name = new FormControl('', [Validators.required, Validators.pattern(/^[\sA-Za-z]+$/)]);
  expiryDate = new FormControl('', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]);

  closeDialog() {
    this.dialogRef.close();
  }

  addCard() {
    let details = {
      "userId": window.localStorage.getItem("userId"),
      "cardNumber": this.cardNumber.value,
      "cardName": this.name.value,
      "cardType": this.cardType,
      "expiryDate": this.expiryDate.value
    }

    this.accountService.addAccount(details)
      .subscribe(response => { }, error => { });
    
    this.closeDialog();
  }

}
