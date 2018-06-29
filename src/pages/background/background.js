var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Platform, Nav, IonicPage } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { NavProxyService } from '../../services/NavProxy.service';
import { ItemsPage } from '../../pages/items/items';
import { PlaceholderPage } from '../../pages/placeholder/placeholder';
import { NewOrdersPage } from '../../pages/new_orders/new_orders';
import { AllSearchPage } from '../../pages/allsearch/allsearch';
import * as $ from "jquery";
import { Events } from 'ionic-angular';
var BackGroundPage = /** @class */ (function () {
    function BackGroundPage(events, platform, navProxy) {
        var _this = this;
        this.events = events;
        this.navProxy = navProxy;
        // Empty placeholders for the 'master/detail' pages...
        this.masterPage = null;
        this.detailPage = null;
        var self = this;
        events.subscribe('details', function (item) {
            _this.aDetails[0].value = item.asset_id;
            _this.aDetails[1].value = item.assetOwner;
            _this.aDetails[2].value = item.chassisNumber;
            _this.aDetails[3].value = item.hoursRun;
            _this.aDetails[4].value = item.numberOfKilometersRun;
            _this.aDetails[5].value = item.nextServiceDueon.formatted;
            _this.aDetails[6].value = item.insuranceRenewalDueon.formatted;
            _this.aDetails[7].value = item.averageFuelConsumption;
            _this.aDetails[8].value = item.RFID_reference;
            _this.aDetails[9].value = "center name";
            _this.aDetails[10].value = "";
            _this.aDetails[11].value = "";
            _this.aDetails[12].value = "";
            self.image = item.image;
            $('.track-detail').css('display', 'block');
        });
        events.subscribe('order_details', function (item) {
            _this.orderDetails[0].value = item.product_date_string;
            _this.orderDetails[1].value = item.product_date_string;
            _this.orderDetails[2].value = item.product_start_time;
            _this.orderDetails[3].value = item.customer_id;
            _this.orderDetails[4].value = item.customer_name;
            _this.orderDetails[5].value = item.location_village_name + ", " + item.location_hobli + "," + item.location_taluk + ", " + item.location_distrct;
            // this.orderDetails[6].value = "Location Unknown";
            // this.orderDetails[7].value = "Mobile UnKnown";
            // this.orderDetails[8].value = "Address of Service UnKnown";
            // this.orderDetails[9].value = "Pin Code";
            // this.orderDetails[10].value = "Credit Pending";
            // this.orderDetails[11].value = "Product needed";
            // this.orderDetails[12].value = "Distance between Center and Location";
            // this.orderDetails[11].value = "Driver/Operator needed";
            // this.orderDetails[12].value = "Approximate Value of Order";
            self.image = item.image;
            $('.order-detail').css('display', 'block');
        });
        events.subscribe('order_delete', function (order_id, index) {
            self.delete_name = order_id;
            self.delete_index = index;
            self.delete_flag = true;
            $('.delete-order').css('display', 'block');
        });
        events.subscribe('delete_rowA', function (name, index) {
            self.delete_name = name;
            self.delete_index = index;
            self.delete_flag = true;
            $('.delete-modal').css('display', 'block');
        });
        events.subscribe('delete_rowB', function (name, index) {
            self.delete_name = name;
            self.delete_index = index;
            self.delete_flag = false;
            $('.delete-modal').css('display', 'block');
        });
        platform.ready().then(function () {
            // Add our nav controllers to
            // the nav proxy service...
            navProxy.masterNav = _this.masterNav;
            navProxy.detailNav = _this.detailNav;
            // set initial pages for
            // our nav controllers...
            _this.masterNav.setRoot(ItemsPage, { detailNavCtrl: _this.detailNav });
            _this.detailNav.setRoot(PlaceholderPage);
            _this.aDetails = [
                { name: "Asset ID", value: "1" },
                { name: "Asset Owner", value: "2" },
                { name: "Chassis number", value: "3" },
                { name: "Hours run", value: "4" },
                { name: "No.of KMS", value: "5" },
                { name: "Next service", value: "6" },
                { name: "Insurance renewal date", value: "7" },
                { name: "Avg,fuel consumption", value: "8" },
                { name: "RFID no", value: "9" },
                { name: "Associated center name", value: "10" },
                { name: "List of orders attached", value: "11" },
                { name: "Drivers attached", value: "12" },
                { name: "Total revenue generated", value: "13" },
            ];
            _this.orderDetails = [
                { name: "Data of Order", value: "" },
                { name: "Date & Day of Service", value: "" },
                { name: "Time for Service", value: "" },
                { name: "Customer ID", value: "" },
                { name: "Customer Name", value: "" },
                { name: "Customer location", value: "" },
                { name: "Center location", value: "" },
                { name: "Mobile Number", value: "" },
                { name: "Address of Service", value: "" },
                { name: "Pin Code", value: "" },
                { name: "Credit Pending", value: "" },
                { name: "Product needed", value: "" },
                { name: "Distance between Center and Location", value: "" },
                { name: "Driver/Operator needed", value: "" },
                { name: "Approximate Value of Order", value: "" },
            ];
            _this.bDetails = [
                { name: "Type of consummable", value: "1" },
                { name: "Manufacturer", value: "2" },
                { name: "Weight", value: "3" },
                { name: "Quantity", value: "4" },
                { name: "Expiry date", value: "5" },
            ];
        });
    }
    BackGroundPage.prototype.ngOnInit = function () {
        var self = this;
        $('.custom-header-add').click(function () {
            self.navProxy.pushDetail(NewOrdersPage, null);
        });
        $('.custom-header-search').click(function () {
            $('.model-view').css('display', 'block');
            // self.navProxy.pushDetail(NewOrdersPage, null);
        });
        $('.detail-exit-btn').click(function () {
            $('.track-detail').css('display', 'none');
            $('.order-detail').css('display', 'none');
        });
    };
    BackGroundPage.prototype.deleteRow = function (flag) {
        $('.delete-modal').css('display', 'none');
        if (flag == 'true') {
            this.events.publish('deleteRow_confirm', this.delete_flag, this.delete_index);
        }
    };
    BackGroundPage.prototype.deleteOrder = function (flag) {
        $('.delete-order').css('display', 'none');
        if (flag == 'true') {
            this.events.publish('deleteOrder_confirm', this.delete_flag, this.delete_index);
        }
    };
    BackGroundPage.prototype.globalSearch = function (flag) {
        $('.model-view').css('display', 'none');
        this.navProxy.pushDetail(AllSearchPage, flag);
    };
    __decorate([
        ViewChild('detailNav'),
        __metadata("design:type", Nav)
    ], BackGroundPage.prototype, "detailNav", void 0);
    __decorate([
        ViewChild('masterNav'),
        __metadata("design:type", Nav)
    ], BackGroundPage.prototype, "masterNav", void 0);
    BackGroundPage = __decorate([
        IonicPage(),
        Component({
            selector: 'background',
            templateUrl: 'background.html',
        }),
        __metadata("design:paramtypes", [Events,
            Platform,
            NavProxyService])
    ], BackGroundPage);
    return BackGroundPage;
}());
export { BackGroundPage };
//# sourceMappingURL=background.js.map