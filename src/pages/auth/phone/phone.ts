import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { Platform } from 'ionic-angular';
import * as $ from "jquery";


//***********  Facebook **************/
import { Facebook } from '@ionic-native/facebook';

//***********  Google plus **************/
import { GooglePlus } from '@ionic-native/google-plus';


import { AuthData } from '../../../provider/auth-data';
import { WindowRef } from '../../../provider/WindowRef';

import { BackGroundPage } from '../../background/background';

import firebase from 'firebase';

import { LoginPage } from '../login/login';

import { Firebase } from '@ionic-native/firebase';


@IonicPage()
@Component({
  selector: 'page-phone',
  templateUrl: 'phone.html'
})

export class PhonePage {
  public loginForm: any;
  public backgroundImage: any = "./assets/bg1.jpg";
  public imgLogo: any = "./assets/medium_150.70391061453px_1202562_easyicon.net.png";

  public verificationId: any;
  code: string = "";

  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;

  public verifySend = false;


  constructor(public windowRef: WindowRef, public navCtrl: NavController, public authData: AuthData, public fb: FormBuilder, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private facebook: Facebook,
    private googleplus: GooglePlus,
    private platform: Platform, ) {
    let phoneNumber_REGEXP = /^\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{3}$/i;
    this.loginForm = fb.group({
      phoneNumber: ['', Validators.compose([Validators.required, Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.required])]
    });
  }


  ionViewDidLoad() { }

  public ConfirmationID() {
    let self = this;
    let password = this.loginForm.value.password;
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    try {
      var signInCredential = firebase.auth.PhoneAuthProvider.credential(this.verificationId, password);
      firebase.auth().signInWithCredential(signInCredential).then(function (user) {
        setTimeout(() => {
          loader.dismiss();
          self.navCtrl.setRoot(BackGroundPage);
        }, 1000);
      }).catch(function (error) {
        alert("Wrong Verify Code");
        setTimeout(() => {
          loader.dismiss();
        }, 1000);
      })
    } catch (error) {
      alert("error " + error);
      self.navCtrl.setRoot(BackGroundPage);
    }

  }

  public LoginEmail() {
    this.navCtrl.setRoot(LoginPage);
  }

  public getSMS() {
    this.verifySend = false;
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    let phoneNumber = this.loginForm.value.phoneNumber;
    let str_Number = "+91" + String(phoneNumber);
    
    try {
      let self = this;
      (<any>window).FirebasePlugin.verifyPhoneNumber(str_Number, 60, function (credential) {
        alert('Please insert your Confirmation Code');
        setTimeout(() => {
          loader.dismiss();
        }, 1000);
        self.verificationId = credential.verificationId;
        self.verifySend = true;
      }, function (error) {
        alert(error);
        setTimeout(() => {
          loader.dismiss();
        }, 1000);
        alert('Wrong Phone Number');
      });
    } catch (error) {
      alert(error);
      alert('Your device does not support phone verify, Please install or Update Google Play Service');
      setTimeout(() => {
        loader.dismiss();
        // this.navCtrl.setRoot(LoginPage);
      }, 1000);
    }
  }

  presentAlert(title) {
    let alert = this.alertCtrl.create({
      title: title,
      buttons: ['OK']
    });
    alert.present();
  }

}
