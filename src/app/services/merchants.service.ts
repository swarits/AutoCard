import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class MerchantsService {

  constructor(
    private http: HttpClient
  ) { }

  config = require('../../assets/json/config.json');

  getMerchants() {
    return this.http.get<any>(this.config.host + '/merchants');
  }
}
