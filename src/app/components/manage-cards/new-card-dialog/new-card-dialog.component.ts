import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-card-dialog',
  templateUrl: './new-card-dialog.component.html',
  styleUrls: ['./new-card-dialog.component.css']
})
export class NewCardDialogComponent implements OnInit {

  public name=null;
  public cardNumber=null;
  public cardType=null;
  public expiryDate=null;

  constructor() { }

  ngOnInit() {
  }

  addCard() {
    
  }

}
