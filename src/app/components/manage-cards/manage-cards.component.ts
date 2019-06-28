import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardDialogComponent } from './card-dialog/card-dialog.component';
import { NewCardDialogComponent } from './new-card-dialog/new-card-dialog.component';
import { AccountService } from 'src/app/services/account.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-manage-cards',
  templateUrl: './manage-cards.component.html',
  styleUrls: ['./manage-cards.component.css']
})
export class ManageCardsComponent implements OnInit {

  userId = null;
  accounts = [];

  constructor(
    private dialog: MatDialog,
    private accountService: AccountService,
    private snackBar: SnackBarService,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.getCards();
  }

  getCards() {
    this.userId = window.localStorage.getItem('userId');
    if (this.userId != null) {
      this.spinnerService.show()
      this.accountService.getAllAccounts(this.userId)
        .subscribe(response => {
          this.accounts = response;
          this.spinnerService.hide();
        },
          error => {
            this.snackBar.openSnackBar(error.error.message, "");
            this.spinnerService.hide();
          });
    }
  }

  editCard(data) {
    this.dialog.open(CardDialogComponent, {
      data:
        data
    });
    this.dialog.afterAllClosed.subscribe(res => {
      this.getCards();
    });
  }

  addNewCard() {
    this.dialog.open(NewCardDialogComponent);
    this.dialog.afterAllClosed.subscribe(res => {
      this.getCards();
    });
  }

}
