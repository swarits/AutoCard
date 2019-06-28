import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.css']
})
export class CardDialogComponent implements OnInit {

  public cardData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private accountService: AccountService,
    private dialogRef: MatDialogRef<CardDialogComponent>,
    private snackBar: SnackBarService
  ) {
  }

  ngOnInit() {
    this.cardData = Object.assign({}, this.data);
  }

  name = new FormControl('', [Validators.required, Validators.pattern(/^[\sA-Za-z]+$/)]);

  expiryDate = new FormControl('', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]);

  closeDialog() {
    this.dialogRef.close();
  }

  editCard() {
    this.accountService.editAccount(this.cardData['userId'], this.cardData['cardNumber'], this.cardData)
      .subscribe(response => {
        this.snackBar.openSnackBar(response.message, "");
        this.closeDialog();
      }, error => {
        this.snackBar.openSnackBar(error.error.message, "");
      });
  }

  deleteAccount() {
    this.accountService.deleteAccount(this.cardData['userId'], this.cardData['cardNumber'])
      .subscribe(response => {
        this.closeDialog();
        this.snackBar.openSnackBar(response.message, "");
      },
        error => {
          this.snackBar.openSnackBar(error.error.message, "");
        });
  }

}
