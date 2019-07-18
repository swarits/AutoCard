import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  config = require('../../assets/json/config.json');

  makeTransaction(data) {
    return this.http.post<any>(this.config.host + '/transactions', data);
  }

  transferToPerson(data) {
    return this.http.post<any>(this.config.host + '/ptp-transfer', data);
  }

  transferToMerchant(data) {
    return this.http.post<any>(this.config.host + '/ptm-transfer', data);
  }

}
