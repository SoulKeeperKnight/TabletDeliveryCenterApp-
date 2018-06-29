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
import { AuthData } from '../../../provider/auth-data';
var MainPage = /** @class */ (function () {
    function MainPage(navCtrl, authData, platform, fb, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.authData = authData;
        this.platform = platform;
        this.fb = fb;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.backgroundImage = "./assets/bg11.jpg";
        this.imgLogo = "./assets/ionic.png";
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.loginForm = fb.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }
    MainPage.prototype.facebookLogin = function () {
        var _this = this;
        var loadingPopup = this.loadingCtrl.create({
            spinner: 'crescent',
            content: '',
            duration: 15000
        });
        loadingPopup.present();
        // call signInWithFacebook in authData provider.
        if (this.platform.is('cordova')) {
            this.authData.signInWithFacebook()
                .then(function (authData) {
                _this.authData.updateUserProfile(authData.uid, authData.displayName, authData.email, authData.photoURL, authData.phoneNumber);
                loadingPopup.dismiss();
                _this.navCtrl.setRoot('AfterLoginPage');
            }, function (error) {
                var errorMessage = error.message;
                loadingPopup.dismiss().then(function () {
                    alert("Error:" + errorMessage);
                });
            });
        }
        else {
            alert("Please install app in device.");
            loadingPopup.dismiss();
        }
    };
    MainPage.prototype.googleLogin = function () {
        var _this = this;
        var loadingPopup = this.loadingCtrl.create({
            spinner: 'crescent',
            content: '',
            duration: 15000
        });
        loadingPopup.present();
        if (this.platform.is('cordova')) {
            this.authData.signInWithGoogle()
                .then(function (authData) {
                _this.authData.updateUserProfile(authData.uid, authData.displayName, authData.email, authData.photoURL, authData.phoneNumber);
                loadingPopup.dismiss();
                _this.navCtrl.setRoot('AfterLoginPage');
            }, function (error) {
                var errorMessage = error.message;
                loadingPopup.dismiss().then(function () {
                    alert("Error" + errorMessage);
                });
            });
        }
        else {
            alert("Please install app in device.");
            loadingPopup.dismiss();
        }
    };
    MainPage.prototype.loginWithEmail = function () {
        this.navCtrl.push('LoginPage');
    };
    MainPage.prototype.createAccount = function () {
        this.navCtrl.push('RegisterPage');
    };
    MainPage.prototype.presentAlert = function (title) {
        var alert = this.alertCtrl.create({
            title: title,
            buttons: ['OK']
        });
        alert.present();
    };
    MainPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-main',
            templateUrl: 'main.html'
        }),
        __metadata("design:paramtypes", [NavController, AuthData, Platform, FormBuilder, AlertController, LoadingController])
    ], MainPage);
    return MainPage;
}());
export { MainPage };
//# sourceMappingURL=main.js.map