var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Platform } from 'ionic-angular';
//***********  Facebook **************/
import { Facebook } from '@ionic-native/facebook';
//***********  Google plus **************/
import { GooglePlus } from '@ionic-native/google-plus';
import { AuthData } from '../../../provider/auth-data';
import { WindowRef } from '../../../provider/WindowRef';
import { BackGroundPage } from '../../background/background';
import firebase from 'firebase';
import { LoginPage } from '../login/login';
var PhonePage = /** @class */ (function () {
    function PhonePage(windowRef, navCtrl, authData, fb, alertCtrl, loadingCtrl, facebook, googleplus, platform) {
        this.windowRef = windowRef;
        this.navCtrl = navCtrl;
        this.authData = authData;
        this.fb = fb;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.facebook = facebook;
        this.googleplus = googleplus;
        this.platform = platform;
        this.backgroundImage = "./assets/bg1.jpg";
        this.imgLogo = "./assets/medium_150.70391061453px_1202562_easyicon.net.png";
        this.code = "";
        this.verifySend = false;
        var phoneNumber_REGEXP = /^\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{3}$/i;
        this.loginForm = fb.group({
            phoneNumber: ['', Validators.compose([Validators.required, Validators.required])],
            password: ['', Validators.compose([Validators.required, Validators.required])]
        });
    }
    PhonePage.prototype.ionViewDidLoad = function () { };
    PhonePage.prototype.ConfirmationID = function () {
        var self = this;
        var password = this.loginForm.value.password;
        var loader = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loader.present();
        try {
            var signInCredential = firebase.auth.PhoneAuthProvider.credential(this.verificationId, password);
            firebase.auth().signInWithCredential(signInCredential).then(function (user) {
                setTimeout(function () {
                    loader.dismiss();
                    self.navCtrl.setRoot(BackGroundPage);
                }, 1000);
            }).catch(function (error) {
                alert("Wrong Verify Code");
                setTimeout(function () {
                    loader.dismiss();
                }, 1000);
            });
        }
        catch (error) {
            alert("error " + error);
            self.navCtrl.setRoot(BackGroundPage);
        }
    };
    PhonePage.prototype.LoginEmail = function () {
        this.navCtrl.setRoot(LoginPage);
    };
    PhonePage.prototype.getSMS = function () {
        this.verifySend = false;
        var loader = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loader.present();
        var phoneNumber = this.loginForm.value.phoneNumber;
        var str_Number = "+91" + String(phoneNumber);
        try {
            var self_1 = this;
            window.FirebasePlugin.verifyPhoneNumber(str_Number, 60, function (credential) {
                alert('Please insert your Confirmation Code');
                setTimeout(function () {
                    loader.dismiss();
                }, 1000);
                self_1.verificationId = credential.verificationId;
                self_1.verifySend = true;
            }, function (error) {
                alert(error);
                setTimeout(function () {
                    loader.dismiss();
                }, 1000);
                alert('Wrong Phone Number');
            });
        }
        catch (error) {
            alert(error);
            alert('Your device does not support phone verify, Please install or Update Google Play Service');
            setTimeout(function () {
                loader.dismiss();
                // this.navCtrl.setRoot(LoginPage);
            }, 1000);
        }
    };
    PhonePage.prototype.presentAlert = function (title) {
        var alert = this.alertCtrl.create({
            title: title,
            buttons: ['OK']
        });
        alert.present();
    };
    PhonePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-phone',
            templateUrl: 'phone.html'
        }),
        __metadata("design:paramtypes", [WindowRef, NavController, AuthData, FormBuilder, AlertController, LoadingController, Facebook,
            GooglePlus,
            Platform])
    ], PhonePage);
    return PhonePage;
}());
export { PhonePage };
//# sourceMappingURL=phone.js.map