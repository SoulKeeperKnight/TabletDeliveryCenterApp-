var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { _DetailPage } from '../';
import { InventoryPage } from '../inventory/inventory';
import { NavProxyService } from '../../services/NavProxy.service';
import * as $ from "jquery";
var TrackInventoryPage = /** @class */ (function (_super) {
    __extends(TrackInventoryPage, _super);
    function TrackInventoryPage(navCtrl, http, navParams, navProxy) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.http = http;
        _this.navParams = navParams;
        _this.navProxy = navProxy;
        _this.item = navParams.data;
        _this.getJSON().subscribe(function (data) { return _this.rows = data.technologies; }, function (error) { return console.log(error); });
        // Define the columns for the data table
        // (based off the names of the keys in the JSON file)
        _this.columns = [
            { prop: 'item_image' },
            { prop: 'inventory_snapshot' },
            { prop: 'make_model' },
            { prop: 'owner' },
            { prop: 'Details' },
            { prop: 'Special Action' },
        ];
        return _this;
    }
    TrackInventoryPage.prototype.ngOnInit = function () {
        var self = this;
        $('.table-title').click(function () {
            self.navProxy.pushDetail(InventoryPage, null);
        });
    };
    TrackInventoryPage.prototype.getJSON = function () {
        return this.http.get("./assets/data/inventory.json")
            .map(function (res) { return res.json(); });
    };
    TrackInventoryPage.prototype.onSpecialAction = function (row, action, index) {
        console.log(row);
        console.log(action);
        console.log(index);
        if (action == "delete") {
            if (index > -1) {
                this.rows.splice(index, 1);
                this.rows = this.rows.slice();
            }
        }
    };
    TrackInventoryPage.prototype.onShowDetails = function (row, rowIndex) {
        $('.track-detail').css('display', 'block');
    };
    TrackInventoryPage = __decorate([
        IonicPage(),
        Component({
            selector: 'track_inventory',
            templateUrl: 'track_inventory.html'
        }),
        __metadata("design:paramtypes", [NavController, Http, NavParams, NavProxyService])
    ], TrackInventoryPage);
    return TrackInventoryPage;
}(_DetailPage));
export { TrackInventoryPage };
//# sourceMappingURL=track_inventory.js.map