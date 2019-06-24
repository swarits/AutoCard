import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.css']
})
export class CardDialogComponent implements OnInit, AfterViewInit {

  public cardData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data
  ) { 
  }

  ngOnInit() {
    console.log(this.data);
    this.cardData = Object.assign({}, this.data);
  }

 ngAfterViewInit() {
 }

}
