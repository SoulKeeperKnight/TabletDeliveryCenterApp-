import { Platform, Nav, NavController, NavParams, IonicPage } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { NavProxyService } from '../../services/NavProxy.service';
import { ItemsPage } from '../../pages/items/items';
import { PlaceholderPage } from '../../pages/placeholder/placeholder';
import { NewOrdersPage } from '../../pages/new_orders/new_orders';
import { MainPage } from '../../pages/auth/main/main';
import { AllSearchPage } from '../../pages/allsearch/allsearch';
import { EmployeePage } from '../../pages/employee/employee';
import * as $ from "jquery";

import { _DetailPage } from '../';

import { Events } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'background',
    templateUrl: 'background.html',
})
export class BackGroundPage {

    @ViewChild('detailNav') detailNav: Nav;
    @ViewChild('masterNav') masterNav: Nav;

    // Empty placeholders for the 'master/detail' pages...
    masterPage: any = null;
    detailPage: any = null;
    aDetails: any;
    bDetails: any;
    orderDetails: any;
    image : any;
    delete_name: any;
    delete_index : any;
    delete_flag: any;

    constructor(
        public events: Events,
        platform: Platform,
        public navProxy: NavProxyService) {
        let self = this;
        $('.item_details-model').css('display', 'none');
        events.subscribe('details', (item) => {
            this.aDetails[0].value = item.asset_id;
            this.aDetails[1].value = item.assetOwner;
            this.aDetails[2].value = item.chassisNumber;
            this.aDetails[3].value = item.hoursRun;
            this.aDetails[4].value = item.numberOfKilometersRun;
            this.aDetails[5].value = item.nextServiceDueon.formatted;
            this.aDetails[6].value = item.insuranceRenewalDueon.formatted;
            this.aDetails[7].value = item.averageFuelConsumption;
            this.aDetails[8].value = item.RFID_reference;
            this.aDetails[9].value = "center name";
            this.aDetails[10].value = "";
            this.aDetails[11].value = "";
            this.aDetails[12].value = "";
            self.image = item.image;
            $('.track-detail').css('display', 'block');
        });


        events.subscribe('order_details', (item) => {
            this.orderDetails[0].value = item.product_date_string;
            this.orderDetails[1].value = item.product_date_string;
            this.orderDetails[2].value = item.product_start_time;
            this.orderDetails[3].value = item.customer_id;
            this.orderDetails[4].value = item.customer_name;
            this.orderDetails[5].value = item.location_village_name + ", " + item.location_hobli + "," + item.location_taluk + ", " + item.location_distrct
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

        events.subscribe('order_delete', (order_id,index) => {
            self.delete_name = order_id;
            self.delete_index = index;
            self.delete_flag = true;
            $('.delete-order').css('display', 'block');
        });

        events.subscribe('delete_rowA', (name,index) => {
            self.delete_name = name;
            self.delete_index = index;
            self.delete_flag = true;
            $('.delete-modal').css('display', 'block');
        });

        events.subscribe('delete_rowB', (name,index) => {
            self.delete_name = name;
            self.delete_index = index;
            self.delete_flag = false;
            $('.delete-modal').css('display', 'block');
        });

        platform.ready().then(() => {

            // Add our nav controllers to
            // the nav proxy service...
            navProxy.masterNav = this.masterNav;
            navProxy.detailNav = this.detailNav;

            // set initial pages for
            // our nav controllers...
            this.masterNav.setRoot(ItemsPage, { detailNavCtrl: this.detailNav });
            this.detailNav.setRoot(PlaceholderPage);
            this.aDetails = [
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
            this.orderDetails = [
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
            this.bDetails = [
                { name: "Type of consummable", value: "1" },
                { name: "Manufacturer", value: "2" },
                { name: "Weight", value: "3" },
                { name: "Quantity", value: "4" },
                { name: "Expiry date", value: "5" },
            ];

        });

    }
    ngOnInit() {
        let self = this;
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
    }
    deleteRow (flag){
        $('.delete-modal').css('display', 'none');
        if (flag == 'true' ) {
            this.events.publish('deleteRow_confirm',this.delete_flag,this.delete_index);
        }
    }
    deleteOrder (flag){
        $('.delete-order').css('display', 'none');
        if (flag == 'true' ) {
            this.events.publish('deleteOrder_confirm',this.delete_flag,this.delete_index);
        }
    }
    globalSearch(flag) {
        $('.model-view').css('display', 'none');
        this.navProxy.pushDetail(AllSearchPage, flag);
    }

    closemodel(flag){
            $('.item_details-model').css('display', 'none');
        if (flag == 'true' ) {
            this.events.publish('EmployeePage',this.delete_flag,this.delete_index);
        }
    }

}
