import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-passbook',
  templateUrl: './passbook.component.html',
  styleUrls: ['./passbook.component.css']
})
export class PassbookComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

  close() {
    this.sidenav.close();
  }

}
