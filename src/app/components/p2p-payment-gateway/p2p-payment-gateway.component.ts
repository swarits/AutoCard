import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { PaymentService } from 'src/app/services/payment.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-p2p-payment-gateway',
  templateUrl: './p2p-payment-gateway.component.html',
  styleUrls: ['./p2p-payment-gateway.component.css']
})
export class P2pPaymentGatewayComponent implements OnInit {

  constructor(private accountService: AccountService,
    private paymentService: PaymentService,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.accountService.getCards(window.localStorage.getItem('userId')).subscribe(response => {
      this.cards = response;
    }, error => {

    });
  }

  cvv = new FormControl('', [Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.pattern(/^[0-9]+$/)]);
  recipientName = new FormControl('', [Validators.required, Validators.pattern(/^[\sA-Za-z]+$/)]);
  recipientPrimaryAccountNumber = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(16), Validators.minLength(16)]);
  amount = null;
  description = null;
  card = null;
  cards = [];

  transferMoney() {
    let data = {
      "senderPrimaryAccountNumber": this.card,
      "recipientPrimaryAccountNumber": this.recipientPrimaryAccountNumber.value,
      "cardCvv2Value": this.cvv.value,
      "amount": +this.amount,
      "recipientName": this.recipientName.value,
      "description": this.description
    }
    this.spinnerService.show();
    this.paymentService.transferToPerson(data).subscribe(response => {
    this.spinnerService.hide();
    }, error => {
      this.spinnerService.hide();
    });

  }

}
