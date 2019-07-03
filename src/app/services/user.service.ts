import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  config = require('../../assets/json/config.json');

  constructor(private http: HttpClient) { }

  signUp(userData) {
    return this.http.post<any>(this.config.host + "/user/register", userData, { observe: 'response' });
  }

  signIn(userData) {
    return this.http.post<any>(this.config.host + '/user/sign-in', userData, { observe: 'response' });
  }

  resetPasswordRequest(email) {
    let params = new HttpParams().set('email', email);
    return this.http.post<any>(this.config.host + '/user/reset-password-request', params);
  }

  resetPassword(email, token) {
    let params = new HttpParams().set('email', email).set('token', token);
    return this.http.post<any>(this.config.host + '/user/reset-password', params);
  }

  changePassword(details) {
    return this.http.post<any>(this.config.host + '/user/change-password', details);
  }

}
