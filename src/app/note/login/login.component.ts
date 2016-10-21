import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','./material.min.css']
})
export class LoginComponent implements OnInit {
  user = {};
  userInfo;
  constructor(
      public af: AngularFire
  ) {
        this.af.auth.subscribe(user => {
        if(user) {
          // user logged in
          this.user = user;
        }
        else {
          // user not logged in
          this.user = {};
        }
      });
  }

  ngOnInit() {
  }

  loginGG() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Redirect
    });
  }

  loginFB() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    });
  }

  logout() {
    this.af.auth.logout();
  }

  showInfo() {
    console.log(this.user)
    this.userInfo = JSON.stringify(this.user);
    console.log(this.userInfo)
  }

}
