import { Component } from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams } from 'ionic-angular';
import { NavProxyService } from '../../services/NavProxy.service';
import {
    _MasterPage,
    ItemPage,
    OrdersPage,
    DashboardPage,
    DriversPage,
    EmployeePage,
    UsercollectionPage,
    AllOrdersPage} from '../';
import { InventoryPage } from '../inventory/inventory';

@IonicPage()
@Component({
    selector: 'page-items',
    templateUrl: 'items.html',
})
export class ItemsPage extends _MasterPage {

    items: Array<any> = [
        { id: 0, description: 'DASHBOARD', showSubmenu: true, image_active:"./assets/img/side nav icons/sidenav dash active.png" , image_inactive:"./assets/img/side nav icons/sidenav dash inactive.png"},
        { id: 1, description: 'ORDERS', showSubmenu: true, image_active:"./assets/img/side nav icons/sidenav orders active.png" , image_inactive:"./assets/img/side nav icons/sidenav orders inactive.png", childs: [{id: 10, description: "TODAY'S ORDERS"},{id: 11, description: 'ALL ORDERS'}] },
        { id: 2, description: 'REGISTER CUSTOMER', image_active:"./assets/img/side nav icons/sidenav register active.png" , image_inactive:"./assets/img/side nav icons/sidenav register inactive.png", showSubmenu: true },
        { id: 3, description: 'REPORTS', image_active:"./assets/img/side nav icons/sidenav reports active.png" , image_inactive:"./assets/img/side nav icons/sidenav reports inactive.png", showSubmenu: true },
        { id: 4, description: 'ESCALATED ORDERS', image_active:"./assets/img/side nav icons/sidenav escalated active.png" , image_inactive:"./assets/img/side nav icons/sidenav escalated inactive.png", showSubmenu: true },
        { id: 5, description: 'CHECK INVENTORY',showSubmenu: true, image_active:"./assets/img/side nav icons/sidenav inventory active.png" , image_inactive:"./assets/img/side nav icons/sidenav inventory inactive.png",  childs: [{id: 50, description: "ALL"},{id: 51, description: 'OWNED'},{id: 52, description: 'LEASED'}] },
        { id: 6, description: 'EMPLOYEES', image_active:"./assets/img/side nav icons/sidenav employee active.png" , image_inactive:"./assets/img/side nav icons/sidenav employee inactive.png", showSubmenu: true },
        { id: 7, description: 'DRIVERS', image_active:"./assets/img/side nav icons/sidenav employee active.png" , image_inactive:"./assets/img/side nav icons/sidenav employee inactive.png", showSubmenu: true },
        { id: 8, description: 'USER COLLECTION', image_active:"./assets/img/side nav icons/sidenav employee active.png" , image_inactive:"./assets/img/side nav icons/sidenav employee inactive.png", showSubmenu: true },
              
    ];
    showSubmenu: boolean = false;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private navProxy: NavProxyService) {
        super();
    }
    current_id: any;
    parent_item: any;

    onItemSelected(item) {
        // Rather than using:
        //     this.navCtrl.push(...)
        // Use our proxy:
        if ( typeof(this.parent_item) != 'undefined' && this.parent_item != item && this.parent_item.childs.indexOf(item) == -1) {
            this.parent_item.showSubmenu = true;    
        }
        if (typeof(item.childs) != 'undefined') {
            this.parent_item = item;
            item.showSubmenu = false;
            if (item.showSubmenu == false) {
                item = item.childs[0];
            }
            
        }
        
        this.current_id = item.id;
        console.log('this.current_id ',this.current_id );
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
        if (this.current_id == 6) {
            this.navProxy.pushDetail(EmployeePage, item);
        }
        if (this.current_id == 8) {
            this.navProxy.pushDetail(UsercollectionPage, item);
        }
    }

}
