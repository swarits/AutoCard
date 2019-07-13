import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentService } from 'src/app/services/payment.service';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { MerchantsService } from 'src/app/services/merchants.service';
import { TransactionCategoriesService } from 'src/app/services/transaction-categories.service';


@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {

  constructor(private paymentService: PaymentService, private accountService: AccountService,
    private snackBar: MatSnackBar,
    private merchantsService: MerchantsService,
    private categoresService: TransactionCategoriesService) { }

  merchants = [];
  categories = [];
  cards = [];

  ngOnInit() {
    this.merchantsService.getMerchants().subscribe(response => {
      this.merchants = response;
    }, error => {
    });

    this.categoresService.getCategories().subscribe(response => {
      this.categories = response;
    }, error => {

    });

    this.accountService.getCards(window.localStorage.getItem('userId')).subscribe(response => {
      this.cards = response;
    }, error => {
    });

  }

  card = null;
  merchant = null;
  amount = null;
  category = null;
  description = null;

  makeTransaction() {
    let data = {
      "cardNumber": this.card,
      "merchant": this.merchant,
      "amount": +this.amount,
      "category": this.category,
      "type": "Debit",
      "description": this.description
    }

    this.paymentService.makeTransaction(data).subscribe(response => {
      console.log(response);
      this.resetFormData();
      this.snackBar.open("Transaction Successful.", "", {
        duration: 2000
      });
    },
      error => {
        console.log(error);
        if (error.status == 200) {
          this.snackBar.open("Transaction Successful.", "", {
            duration: 2000
          });
        } else {
          this.snackBar.open("Transaction Declined", "", {
            duration: 2000
          });
        }
        this.resetFormData();
      });

  }

  resetFormData() {
    this.card = null;
    this.amount = null;
    this.merchant = null;
    this.category = null;
    this.description = null;
  }

}
