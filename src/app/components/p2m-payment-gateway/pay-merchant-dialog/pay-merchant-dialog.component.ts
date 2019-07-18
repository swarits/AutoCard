import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { P2mPaymentGatewayComponent } from '../p2m-payment-gateway.component';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { AccountService } from 'src/app/services/account.service';
import { Validators, FormControl } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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
    private accountService: AccountService,
    private paymentService: PaymentService,
    private spinnerService: Ng4LoadingSpinnerService
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
    let data = {
      "card": this.card,
      "amount": this.amount,
      "cvv": this.cvv.value,
      "merchantId": this.data.merchantId,
      "merchantName": this.data.merchantName
    }
    this.spinnerService.show();
    this.paymentService.transferToMerchant(data).subscribe(response => {
      this.spinnerService.hide();
      this.closeDialog();
      this.snackBar.openSnackBar(response.message, "");
    }, error => {
      this.spinnerService.hide();
      this.snackBar.openSnackBar(error.error.message, "");
    });

  }

  closeDialog() {
    this.dialogRef.close();
  }

}
