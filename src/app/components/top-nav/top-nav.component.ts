import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  name = null;
  email=null;
  constructor(private cookieService: CookieService, private router: Router, private snackBar: SnackBarService) { }

  ngOnInit() {
    this.name = window.localStorage.getItem('firstname') +" " + window.localStorage.getItem('lastname');
    this.email = window.localStorage.getItem('email');
  }

  signOut() {
    //TODO: call api
    this.cookieService.delete("session");
    window.localStorage.clear();
    this.router.navigateByUrl('/login');
    this.snackBar.openSnackBar("Successfully logged out.", "");
  }

}
