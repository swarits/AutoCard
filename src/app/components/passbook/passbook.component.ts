import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-passbook',
  templateUrl: './passbook.component.html',
  styleUrls: ['./passbook.component.css']
})
export class PassbookComponent implements OnInit {

  merchants = {
    "Amazon": true,
    "Flipkart": true,
    "paytm": true
  };

  cards = {
    "1234567890123456": true,
    "1234": false
  };

  categories = {
    "Entertainment": true,
    "Education": true,
    "Shopping": true,
    "Personal Care": true,
    "Health & Fitness": true,
    "Kids": true,
    "Food & Dining": true,
    "Gifts & Donations": true,
    "Investments": true,
    "Bils & Utilities": true,
    "Auto & Transport": true,
    "Travel": true,
    "Fees & Charges": true,
    "Business Services": true,
    "Taxes": true
  }

  transactions = [
    {
      "CardNumber": "1234567890123456",
      "Amount": 124.5,
      "Date": "09/03/2039",
      "Merchant": "Amazon",
      "Category": "Entertainment",
      "Type": "One-time",
      "Description": "iPhone, iPad, Apple(fruit)"
    },
    {
      "CardNumber": "2345624789659265",
      "Amount": 123.5,
      "Date": "09/03/2039",
      "Merchant": "paytm",
      "Category": "Kids",
      "Type": "One-time",
      "Description": "Coffee"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

  close() {
    this.sidenav.close();
  }
  
  applyFilters() {

  }

}
