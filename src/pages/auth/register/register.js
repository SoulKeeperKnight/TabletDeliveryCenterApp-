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
import { AuthData } from '../../../provider/auth-data';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(nav, authData, fb, loadingCtrl, alertCtrl) {
        this.nav = nav;
        this.authData = authData;
        this.fb = fb;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.backgroundImage = "./assets/bg2.jpg";
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.registerForm = fb.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
            profileName: ['', Validators.compose([Validators.minLength(2), Validators.required])],
            phone: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
        });
    }
    RegisterPage.prototype.registerUser = function () {
        var _this = this;
        console.log("call signopUser");
        if (!this.registerForm.valid) {
            console.log(this.registerForm.value);
            this.presentAlert("invalid form");
        }
        else {
            var loadingPopup_1 = this.loadingCtrl.create({
                spinner: 'crescent',
                content: 'Creating..'
            });
            loadingPopup_1.present();
            this.authData.registerUser(this.registerForm.value.profileName, this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.phone)
                .then(function () {
                loadingPopup_1.dismiss();
                _this.nav.setRoot('AfterLoginPage');
            }, function (error) {
                var errorMessage = error.message;
                loadingPopup_1.dismiss();
                _this.presentAlert(errorMessage);
            });
        }
    };
    RegisterPage.prototype.presentAlert = function (title) {
        var alert = this.alertCtrl.create({
            title: title,
            buttons: ['OK']
        });
        alert.present();
    };
    RegisterPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-register',
            templateUrl: 'register.html'
        }),
        __metadata("design:paramtypes", [NavController, AuthData, FormBuilder, LoadingController, AlertController])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.js.map