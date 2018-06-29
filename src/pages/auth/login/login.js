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
import { BackGroundPage } from '../../background/background';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, authData, fb, alertCtrl, loadingCtrl, facebook, googleplus, platform) {
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
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.loginForm = fb.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        this.navCtrl.setRoot(BackGroundPage);
        if (!this.loginForm.valid) {
            //this.presentAlert('Username password can not be blank')
            console.log("error");
        }
        else {
            var loadingPopup_1 = this.loadingCtrl.create({
                spinner: 'crescent',
                content: ''
            });
            loadingPopup_1.present();
            this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
                .then(function (authData) {
                console.log("Auth pass");
                loadingPopup_1.dismiss();
                // this.navCtrl.setRoot('AfterLoginPage');
                _this.navCtrl.setRoot(BackGroundPage);
            }, function (error) {
                var errorMessage = error.message;
                loadingPopup_1.dismiss().then(function () {
                    _this.presentAlert(errorMessage);
                });
            });
        }
    };
    LoginPage.prototype.forgot = function () {
        this.navCtrl.push('ForgotPage');
    };
    LoginPage.prototype.createAccount = function () {
        this.navCtrl.push('RegisterPage');
    };
    LoginPage.prototype.presentAlert = function (title) {
        var alert = this.alertCtrl.create({
            title: title,
            buttons: ['OK']
        });
        alert.present();
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html'
        }),
        __metadata("design:paramtypes", [NavController, AuthData, FormBuilder, AlertController, LoadingController, Facebook,
            GooglePlus,
            Platform])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map