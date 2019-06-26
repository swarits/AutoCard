import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-card-dialog',
  templateUrl: './new-card-dialog.component.html',
  styleUrls: ['./new-card-dialog.component.css']
})
export class NewCardDialogComponent implements OnInit {

  public cardType = null;

  constructor() { }

  ngOnInit() {
  }

  cardNumber = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]);
  name = new FormControl('', [Validators.required, Validators.pattern(/^[\sA-Za-z]+$/)]);
  expiryDate = new FormControl('', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]);


  addCard() {

  }

}
