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
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavProxyService } from '../../services/NavProxy.service';
import { _MasterPage, OrdersPage, DashboardPage, DriversPage, AllOrdersPage } from '../';
import { InventoryPage } from '../inventory/inventory';
var ItemsPage = /** @class */ (function (_super) {
    __extends(ItemsPage, _super);
    function ItemsPage(navCtrl, navParams, navProxy) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.navProxy = navProxy;
        _this.items = [
            { id: 0, description: 'DASHBOARD', showSubmenu: true, image_active: "./assets/img/side nav icons/sidenav dash active.png", image_inactive: "./assets/img/side nav icons/sidenav dash inactive.png" },
            { id: 1, description: 'ORDERS', showSubmenu: true, image_active: "./assets/img/side nav icons/sidenav orders active.png", image_inactive: "./assets/img/side nav icons/sidenav orders inactive.png", childs: [{ id: 10, description: "TODAY'S ORDERS" }, { id: 11, description: 'ALL ORDERS' }] },
            { id: 2, description: 'REGISTER CUSTOMER', image_active: "./assets/img/side nav icons/sidenav register active.png", image_inactive: "./assets/img/side nav icons/sidenav register inactive.png", showSubmenu: true },
            { id: 3, description: 'REPORTS', image_active: "./assets/img/side nav icons/sidenav reports active.png", image_inactive: "./assets/img/side nav icons/sidenav reports inactive.png", showSubmenu: true },
            { id: 4, description: 'ESCALATED ORDERS', image_active: "./assets/img/side nav icons/sidenav escalated active.png", image_inactive: "./assets/img/side nav icons/sidenav escalated inactive.png", showSubmenu: true },
            { id: 5, description: 'CHECK INVENTORY', showSubmenu: true, image_active: "./assets/img/side nav icons/sidenav inventory active.png", image_inactive: "./assets/img/side nav icons/sidenav inventory inactive.png", childs: [{ id: 50, description: "ALL" }, { id: 51, description: 'OWNED' }, { id: 52, description: 'LEASED' }] },
            { id: 6, description: 'EMPLOYEES', image_active: "./assets/img/side nav icons/sidenav employee active.png", image_inactive: "./assets/img/side nav icons/sidenav employee inactive.png", showSubmenu: true },
            { id: 7, description: 'DRIVERS', image_active: "./assets/img/side nav icons/sidenav employee active.png", image_inactive: "./assets/img/side nav icons/sidenav employee inactive.png", showSubmenu: true },
        ];
        _this.showSubmenu = false;
        return _this;
    }
    ItemsPage.prototype.onItemSelected = function (item) {
        // Rather than using:
        //     this.navCtrl.push(...)
        // Use our proxy:
        if (typeof (this.parent_item) != 'undefined' && this.parent_item != item && this.parent_item.childs.indexOf(item) == -1) {
            this.parent_item.showSubmenu = true;
        }
        if (typeof (item.childs) != 'undefined') {
            this.parent_item = item;
            item.showSubmenu = false;
            if (item.showSubmenu == false) {
                item = item.childs[0];
            }
        }
        this.current_id = item.id;
        console.log('');
        if (this.current_id == 0) {
            this.navProxy.pushDetail(DashboardPage, null);
        }
        if (this.current_id == 10) {
            this.navProxy.pushDetail(OrdersPage, item);
        }
        if (this.current_id == 11) {
            this.navProxy.pushDetail(AllOrdersPage, item);
        }
        if (this.current_id == 50) {
            this.navProxy.pushDetail(InventoryPage, item);
        }
        if (this.current_id == 7) {
            this.navProxy.pushDetail(DriversPage, item);
        }
    };
    ItemsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-items',
            templateUrl: 'items.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            NavProxyService])
    ], ItemsPage);
    return ItemsPage;
}(_MasterPage));
export { ItemsPage };
//# sourceMappingURL=items.js.map