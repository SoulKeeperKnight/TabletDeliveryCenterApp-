var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { Events, ToastController, ActionSheetController } from "ionic-angular";
/*
  Generated class for the HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var HelperProvider = /** @class */ (function () {
    function HelperProvider(events, toastCtrl, actionSheetCtrl) {
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.previousStatus = 'online';
    }
    HelperProvider.prototype.getError = function (data) {
        var error_msg = "";
        for (var key in data) {
            error_msg = error_msg + data[key];
        }
        return error_msg;
    };
    HelperProvider.prototype.showMsg = function (msg, classname) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: "top",
            cssClass: classname
        });
        toast.present();
    };
    HelperProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Events,
            ToastController,
            ActionSheetController])
    ], HelperProvider);
    return HelperProvider;
}());
export { HelperProvider };
//# sourceMappingURL=helper.js.map