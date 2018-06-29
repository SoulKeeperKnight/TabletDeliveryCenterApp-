import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MainPage } from '../pages/auth/main/main';
import { LoginPage } from '../pages/auth/login/login';
import { PhonePage } from '../pages/auth/phone/phone';

import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  templateUrl: 'app.html',
  providers: [
    ScreenOrientation
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private screenOrientation: ScreenOrientation) {
    platform.ready().then(() => {
      //private screenOrientation: ScreenOrientation,
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
