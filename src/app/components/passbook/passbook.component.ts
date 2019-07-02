import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AccountService } from 'src/app/services/account.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-passbook',
  templateUrl: './passbook.component.html',
  styleUrls: ['./passbook.component.css']
})
export class PassbookComponent implements OnInit {

  cards = [];
  requestCards = [];


  requestCategories = [];
  categories = [
    "Entertainment",
    "Education",
    "Shopping",
    "Personal Care",
    "Health & Fitness",
    "Kids",
    "Food & Dining",
    "Gifts & Donations",
    "Investments",
    "Bils & Utilities",
    "Auto & Transport",
    "Travel",
    "Fees & Charges",
    "Business Services",
    "Taxes"
  ];


  requestMerchants = [];
  merchants = [
    "Amazon",
    "Flipkart",
    "paytm"
  ];

  transactions = [];

  userId = null;

  constructor(private accountService: AccountService,
    private spinnerService: Ng4LoadingSpinnerService,
    private snackBar: SnackBarService
  ) { }

  ngOnInit() {
    this.getCards();
  }

  getCards() {
    this.userId = window.localStorage.getItem('userId');
    if (this.userId != null) {
      this.accountService.getCards(this.userId).subscribe(response => {
        this.cards = response;
        this.requestCards = Object.assign([], response);
        this.requestCategories = Object.assign([], this.categories);
        this.requestMerchants = Object.assign([], this.merchants);

        this.accountService.getTransactions(this.requestCards, this.requestCategories, this.requestMerchants).subscribe(response => {
          this.transactions = response;
        },error => {
          this.snackBar.openSnackBar(error.error.message, "");
        }
        )

      }, error => {
      });
    }
  }

  checkCard(card, event) {
    if (event.checked == true && !this.requestCards.includes(card)) {
      this.requestCards.push(card);
    } else if (event.checked == false && this.requestCards.includes(card)) {
      for (let i = 0; i < this.requestCards.length; i++) {
        if (this.requestCards[i] == card) {
          this.requestCards.splice(i, 1);
        }
      }
    }
  }

  checkCategory(category, event) {
    if (event.checked == true && !this.requestCategories.includes(category)) {
      this.requestCategories.push(category);
    } else if (event.checked == false && this.requestCategories.includes(category)) {
      for (let i = 0; i < this.requestCategories.length; i++) {
        if (this.requestCategories[i] == category) {
          this.requestCategories.splice(i, 1);
        }
      }
    }
  }

  checkMerchant(merchant, event) {
    if (event.checked == true && !this.requestMerchants.includes(merchant)) {
      this.requestMerchants.push(merchant);
    } else if (event.checked == false && this.requestMerchants.includes(merchant)) {
      for (let i = 0; i < this.requestMerchants.length; i++) {
        if (this.requestMerchants[i] == merchant) {
          this.requestMerchants.splice(i, 1);
        }
      }
    }
  }

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

  close() {
    this.sidenav.close();
  }

  applyFilters() {

    this.accountService.getTransactions(this.requestCards, this.requestCategories, this.requestMerchants).subscribe(
      response => {
        this.transactions = response;
        this.spinnerService.hide();
        this.close();
        this.snackBar.openSnackBar("Transactions filtered", "");
      }, error => {
        this.spinnerService.hide();
        this.snackBar.openSnackBar(error.error.message, "");
      }
    )
  }

}
