import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class TransactionCategoriesService {

  constructor(private http: HttpClient) { }

  config = require('../../assets/json/config.json');

  getCategories() {
    return this.http.get<any>(this.config.host + '/transaction-categories');
  }

}
