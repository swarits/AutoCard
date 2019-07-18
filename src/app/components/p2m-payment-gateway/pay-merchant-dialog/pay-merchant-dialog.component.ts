import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { P2mPaymentGatewayComponent } from '../p2m-payment-gateway.component';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { AccountService } from 'src/app/services/account.service';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-pay-merchant-dialog',
  templateUrl: './pay-merchant-dialog.component.html',
  styleUrls: ['./pay-merchant-dialog.component.css']
})
export class PayMerchantDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<P2mPaymentGatewayComponent>,
    private snackBar: SnackBarService,
    private accountService: AccountService
  ) { }

  cards = [];
  card = null;
  amount = null;
  cvv = new FormControl('', [Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.pattern(/^[0-9]+$/)]);

  ngOnInit() {
    this.accountService.getCards(window.localStorage.getItem('userId')).subscribe(response => {
      this.cards = response;
    }, error => {

    });
  }

  payMerchant() {

  }
}
