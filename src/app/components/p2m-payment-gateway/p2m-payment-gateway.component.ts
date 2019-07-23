import { Component, OnInit } from '@angular/core';
import { map, filter, catchError, mergeMap, distinctUntilChanged, debounceTime, delay, skip } from 'rxjs/operators';
import { Subject, Subscription, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PayMerchantDialogComponent } from './pay-merchant-dialog/pay-merchant-dialog.component';

@Component({
  selector: 'app-p2m-payment-gateway',
  templateUrl: './p2m-payment-gateway.component.html',
  styleUrls: ['./p2m-payment-gateway.component.css']
})
export class P2mPaymentGatewayComponent implements OnInit {

  public keyUp = new Subject<String>();

  private subscription: Subscription;
  searchedMerchants = [];

  constructor(private dialog: MatDialog) {
    this.subscription = this.keyUp.pipe(
      map(event => event),
      skip(1),
      debounceTime(1000),
      distinctUntilChanged(),
      mergeMap(search => of(search).pipe(
        delay(500),
      )),
    ).subscribe(merchant => {
      this.searchedMerchants = this.searchMerchant(merchant);
    });
  }

  ngOnInit() {
  }

  merchants = [
    {
      merchantName: 'STARBUCKS',
      category: 'FAST FOOD RESTAURANTS',
      logo: '/assets/Images/starbucks.png',
      city: 'SAN FRANCISCO',
      merchantId: '29992901',
      address: '3338 N TEXAS ST STE A'
    }
  ];


  searchMerchant(merchantName: String) {
    let merchants = "STARBUCKS";
    if(merchants.includes(merchantName.toUpperCase())){
      return [
        {
          merchantName: 'STARBUCKS',
          category: 'FAST FOOD RESTAURANTS',
          logo: '/assets/Images/starbucks.png',
          city: 'SAN FRANCISCO',
          merchantId: '29992901',
          address: '3338 N TEXAS ST STE A'
        }
      ];
    }else {
      return [];
    }

  }

  payMerchant(data) {
    this.dialog.open(PayMerchantDialogComponent, {
      data:
        data
    });
    this.dialog.afterAllClosed.subscribe(res => {
      //operation after payment
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
