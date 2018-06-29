var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../../provider/auth-data';
var ForgotPage = /** @class */ (function () {
    function ForgotPage(authData, fb, nav, loadingCtrl, alertCtrl) {
        this.authData = authData;
        this.fb = fb;
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.backgroundImage = "./assets/bg3.jpg";
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.resetPasswordForm = fb.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
        });
    }
    ForgotPage.prototype.resetPassword = function () {
        var _this = this;
        if (!this.resetPasswordForm.valid) {
            console.log("form is invalid = " + this.resetPasswordForm.value);
        }
        else {
            var loadingPopup_1 = this.loadingCtrl.create({
                spinner: 'crescent',
                content: ''
            });
            loadingPopup_1.present();
            this.authData.resetPassword(this.resetPasswordForm.value.email)
                .then(function (user) {
                loadingPopup_1.dismiss();
                _this.presentAlert("We just sent you a reset link to your email");
                _this.nav.setRoot('LoginPage');
            }, function (error) {
                loadingPopup_1.dismiss();
                var errorMessage = error.message;
                _this.presentAlert(errorMessage);
            });
        }
    };
    ForgotPage.prototype.presentAlert = function (title) {
        var alert = this.alertCtrl.create({
            title: title,
            buttons: ['OK']
        });
        alert.present();
    };
    ForgotPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-forgot',
            templateUrl: 'forgot.html'
        }),
        __metadata("design:paramtypes", [AuthData, FormBuilder, NavController, LoadingController, AlertController])
    ], ForgotPage);
    return ForgotPage;
}());
export { ForgotPage };
//# sourceMappingURL=forgot.js.map