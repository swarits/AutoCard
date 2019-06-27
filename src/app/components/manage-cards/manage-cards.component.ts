import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardDialogComponent } from './card-dialog/card-dialog.component';
import { NewCardDialogComponent } from './new-card-dialog/new-card-dialog.component';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-manage-cards',
  templateUrl: './manage-cards.component.html',
  styleUrls: ['./manage-cards.component.css']
})
export class ManageCardsComponent implements OnInit {

  selectedCard = {
    name: "Swarit Sharma",
    cardNo: "1234 6544 6546 4564",
    expiryDate: "02/22",
    cardType: "Debit Card"
  }

  userId = null;

  constructor(
    private dialog: MatDialog,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.userId = window.localStorage.getItem('userId');
    if(this.userId!=null)
      this.accountService.getAllAccounts(this.userId);
  }

  editCard(data) {
    this.dialog.open(CardDialogComponent, {data: 
    this.selectedCard
    });
  }

  addNewCard() {
    this.dialog.open(NewCardDialogComponent);
  }

}
