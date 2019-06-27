import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  config = require('../../assets/json/config.json');

  addAccount(details) {
    return this.http.post<any>(this.config.host + "/account/add-card", details);
  }

  getAllAccounts(userId) {
    return this.http.get<any>(this.config.host + '/account/cards', userId);
  }

  editAccount(newDetails) {
    return this.http.post<any>(this.config.host + '/account/edit-card', newDetails);
  }

}
