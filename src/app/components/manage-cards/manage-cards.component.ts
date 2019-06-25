import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardDialogComponent } from './card-dialog/card-dialog.component';
import { NewCardDialogComponent } from './new-card-dialog/new-card-dialog.component';

@Component({
  selector: 'app-manage-cards',
  templateUrl: './manage-cards.component.html',
  styleUrls: ['./manage-cards.component.css']
})
export class ManageCardsComponent implements OnInit {

  carddata = {
    name: "Swarit Sharma",
    cardNo: "1234 6544 6546 4564",
    expiryDate: "02/22",
    cardType: "Debit Card"
  }

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  editCard(data) {
    this.dialog.open(CardDialogComponent, {data: 
    this.carddata
    });
  }

  addNewCard() {
    this.dialog.open(NewCardDialogComponent);
  }

}
