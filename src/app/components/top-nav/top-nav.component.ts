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

  constructor(private cookieService: CookieService, private router: Router, private snackBar: SnackBarService) { }

  ngOnInit() {
  }

  signOut() {
    //clear cookies and call api
    this.cookieService.delete("session");
    this.router.navigateByUrl('/login');
    this.snackBar.openSnackBar("Successfully logged out.", "");
  }

}
