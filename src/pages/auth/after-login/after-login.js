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
import { IonicPage, NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AuthData } from '../../../provider/auth-data';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import md5 from 'crypto-md5'; // dependencies:"crypto-md5"
var AfterLoginPage = /** @class */ (function () {
    function AfterLoginPage(navCtrl, authData, alertCtrl, loadingCtrl, toastCtrl, afAuth, afDb) {
        this.navCtrl = navCtrl;
        this.authData = authData;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.afAuth = afAuth;
        this.afDb = afDb;
        this.profilePicture = "https://www.gravatar.com/avatar/";
        this.profileArray = [];
    }
    AfterLoginPage.prototype.ionViewWillLoad = function () {
        var _this = this;
        this.afAuth.authState.subscribe(function (userAuth) {
            if (userAuth) {
                console.log("auth true!");
                _this.uid = userAuth.uid;
                _this.email = userAuth.email;
                _this.profilePicture = "https://www.gravatar.com/avatar/" + md5(_this.email.toLowerCase(), 'hex');
                var loadingPopup_1 = _this.loadingCtrl.create({
                    spinner: 'crescent',
                    content: '',
                    duration: 15000
                });
                loadingPopup_1.present();
                _this.profile = _this.afDb.object('/userProfile/' + _this.uid);
                _this.profile.subscribe(function (profile) {
                    _this.profileArray = profile;
                    loadingPopup_1.dismiss();
                });
            }
            else {
                console.log("auth false");
                _this.navCtrl.setRoot('MainPage');
            }
        });
    };
    AfterLoginPage.prototype.logout = function () {
        var _this = this;
        this.authData.logoutUser()
            .then(function (authData) {
            console.log("Logged out");
            // toast message
            _this.presentToast('bottom', 'You are now logged out');
            _this.navCtrl.setRoot('MainPage');
        }, function (error) {
            var errorMessage = error.message;
            console.log(errorMessage);
            //this.presentAlert(errorMessage);
        });
    };
    AfterLoginPage.prototype.presentAlert = function (title) {
        var alert = this.alertCtrl.create({
            title: title,
            buttons: ['OK']
        });
        alert.present();
    };
    AfterLoginPage.prototype.presentToast = function (position, message) {
        var toast = this.toastCtrl.create({
            message: message,
            position: position,
            duration: 3000
        });
        toast.present();
    };
    AfterLoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-after-login',
            templateUrl: 'after-login.html'
        }),
        __metadata("design:paramtypes", [NavController, AuthData, AlertController, LoadingController, ToastController, AngularFireAuth, AngularFireDatabase])
    ], AfterLoginPage);
    return AfterLoginPage;
}());
export { AfterLoginPage };
//# sourceMappingURL=after-login.js.map