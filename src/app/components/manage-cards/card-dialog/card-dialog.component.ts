import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.css']
})
export class CardDialogComponent implements OnInit {

  public cardData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data
  ) {
  }

  ngOnInit() {
    console.log(this.data);
    this.cardData = Object.assign({}, this.data);
  }

  name = new FormControl('', [Validators.required, Validators.pattern(/^[\sA-Za-z]+$/)]);

  expiryDate = new FormControl('', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]);

}
