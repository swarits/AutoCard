import { Component, OnInit } from '@angular/core';
import { map, filter, catchError, mergeMap, distinctUntilChanged, debounceTime, delay } from 'rxjs/operators';
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

  constructor(private dialog: MatDialog) {
    this.subscription = this.keyUp.pipe(
      map(event => event),
      debounceTime(750),
      distinctUntilChanged(),
      mergeMap(search => of(search).pipe(
        delay(750),
      )),
    ).subscribe(this.searchMerchant);
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
    console.log(merchantName);
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
