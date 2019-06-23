import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loginnav',
  templateUrl: './loginnav.component.html',
  styleUrls: ['./loginnav.component.css']
})
export class LoginnavComponent implements OnInit {

  @Output() userLoginEvent = new EventEmitter<boolean>();

  userlogin = false;
  constructor() { }

  ngOnInit() {
  }

  login(){
    this.userLoginEvent.emit(true);
    this.userlogin = !this.userlogin;
  }

}
