import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AccountService } from 'src/app/services/account.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { MerchantsService } from 'src/app/services/merchants.service';
import { TransactionCategoriesService } from 'src/app/services/transaction-categories.service';

@Component({
  selector: 'app-passbook',
  templateUrl: './passbook.component.html',
  styleUrls: ['./passbook.component.css']
})
export class PassbookComponent implements OnInit {

  cards = [];
  requestCards = [];


  requestCategories = [];
  categories = [];

  requestMerchants = [];
  merchants = [];

  transactions = [];

  userId = null;

  constructor(private accountService: AccountService,
    private spinnerService: Ng4LoadingSpinnerService,
    private snackBar: SnackBarService,
    private merchantsService: MerchantsService,
    private transactionCategories: TransactionCategoriesService
  ) { }

  ngOnInit() {
    this.getCards();
  }

  getCards() {
    this.userId = window.localStorage.getItem('userId');
    if (this.userId != null) {
      this.accountService.getCards(this.userId).subscribe(response => {
        this.cards = response;
        // this.requestCards = Object.assign([], response);

        this.merchantsService.getMerchants().subscribe(response => {
          this.merchants = response;
          // this.requestMerchants = Object.assign([], this.merchants);

          this.transactionCategories.getCategories().subscribe(response => {
            this.categories = response;
            // this.requestCategories = Object.assign([], this.categories);

            this.accountService.getTransactions(this.cards, this.categories, this.merchants).subscribe(response => {
              this.transactions = response;
            }, error => {
              this.snackBar.openSnackBar(error.error.message, "");
            });

          }, error => {
            this.snackBar.openSnackBar(error.error.message, "");
          });

        },
          error => {
            this.snackBar.openSnackBar(error.error.message, "");
          });

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

    let _categories = this.requestCategories;
    let _merchants = this.requestMerchants;

    if (_categories.length == 0)
      _categories = this.categories;

    if (_merchants.length == 0)
      _merchants = this.merchants;


    this.accountService.getTransactions(this.requestCards, _categories, _merchants).subscribe(
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
