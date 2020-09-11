import { FirebaseService } from './../services/firebase.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public firebaseService: FirebaseService) {}

  ngOnInit(): void {}

  logOut() {
    this.firebaseService.logOutUser();
  }
}
