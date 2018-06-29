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
import { Component, Injectable, } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { _DetailPage } from '../';
import { NewInventoryPage } from '../new_inventory/new_inventory';
import { NavProxyService } from '../../services/NavProxy.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Events } from 'ionic-angular';
import * as $ from "jquery";
var InventoryPage = /** @class */ (function (_super) {
    __extends(InventoryPage, _super);
    function InventoryPage(loadingCtrl, events, afAuth, db, navCtrl, navParams, navProxy) {
        var _this = _super.call(this) || this;
        _this.loadingCtrl = loadingCtrl;
        _this.events = events;
        _this.afAuth = afAuth;
        _this.db = db;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.navProxy = navProxy;
        _this.ShowTabs = true;
        _this.rowsA = [];
        _this.rowsB = [];
        _this.rowsAIndex = [];
        _this.rowsBIndex = [];
        _this.item = navParams.data;
        // this.storage.get('detail').then((val) => {
        //   debugger;
        // });
        // this.getJSON().subscribe(data => this.rows=data.technologies, error => console.log(error));
        // Define the columns for the data table
        // (based off the names of the keys in the JSON file)
        _this.columnsA = [
            { prop: 'image' },
            { prop: 'manufacturer' },
            { prop: 'quantity' },
            { prop: 'activate_in_app' },
            { prop: 'Details' },
            { prop: 'Special Action' }
        ];
        _this.columnsB = [
            { prop: 'image' },
            { prop: 'inventory_snapshot' },
            { prop: 'manufacturer' },
            { prop: 'assetOwner' },
            { prop: 'Details' },
            { prop: 'Special Action' },
        ];
        _this.getFormStore();
        return _this;
    }
    InventoryPage_1 = InventoryPage;
    InventoryPage.prototype.nextOrder = function () {
        this.navProxy.pushDetail(NewInventoryPage, null);
        // this.navProxy.pushDetail( TrackInventoryPage, null);
    };
    InventoryPage.prototype.ngOnInit = function () {
        var self = this;
        $(".table-add-btn").click(function () {
            self.nextOrder();
        });
        $('.table-title').click(function () {
            self.navProxy.pushDetail(InventoryPage_1, null);
        });
        this.events.subscribe('deleteRow_confirm', function (delete_flag, delete_index) {
            if (self.delete_start != true) {
                self.delete_start = true;
                var delete_id_1;
                if (delete_flag == true) {
                    self.rowsA.splice(delete_index, 1);
                    delete_id_1 = self.rowsAIndex[delete_index];
                    self.rowsAIndex.splice(delete_index, 1);
                    self.rowsA = self.rowsA.slice();
                }
                else {
                    self.rowsB.splice(delete_index, 1);
                    delete_id_1 = self.rowsBIndex[delete_index];
                    self.rowsBIndex.splice(delete_index, 1);
                    self.rowsB = self.rowsB.slice();
                }
                var loader_1 = self.loadingCtrl.create({
                    content: 'Please wait...'
                });
                loader_1.present();
                self.db.collection('inventory').ref.get().then(function (snapshot) {
                    if (snapshot.size != 0) {
                        console.log(snapshot.docs.keys());
                        snapshot.docs.find(function (item) { return item.ref.id === delete_id_1; }).ref.delete().then(function (ref) {
                            setTimeout(function () {
                                self.delete_start = false;
                                loader_1.dismiss();
                            }, 1000);
                        });
                    }
                    else {
                        setTimeout(function () {
                            self.delete_start = false;
                            loader_1.dismiss();
                        }, 1000);
                    }
                });
            }
        });
    };
    InventoryPage.prototype.onActiveInApp = function (event) {
        console.log(event);
    };
    //  public getJSON(): Observable<any> {
    //   return this.http.get("./assets/data/inventory.json")
    //                   .map((res:any) => res.json());
    //   } 
    InventoryPage.prototype.onSpecialAction = function (row, action, index, flag) {
        console.log(row);
        console.log(action);
        console.log(index);
        if (action == "delete") {
            if (index > -1) {
                if (flag == 'false') {
                    this.events.publish('delete_rowB', this.rowsB[index].inventory_snapshot, index);
                }
                else {
                    this.events.publish('delete_rowA', this.rowsA[index].manufacturer, index);
                    // this.rowsB.splice(index, 1);
                    // this.rowsB = [...this.rowsB];
                }
            }
        }
        //edit at new inventory
        if (action == 'edit') {
            if (index > -1) {
                if (flag == 'false') {
                    //tractor rowB
                    var data = {
                        id: this.rowsBIndex[index],
                        data: this.rowsB[index],
                        type: 1,
                    };
                    this.navProxy.pushDetail(NewInventoryPage, data);
                }
                else {
                    //seed rowA
                    var data = {
                        id: this.rowsAIndex[index],
                        data: this.rowsA[index],
                        type: 2,
                    };
                    this.navProxy.pushDetail(NewInventoryPage, data);
                }
            }
        }
    };
    InventoryPage.prototype.onShowDetails = function (row, rowIndex) {
        var item = this.rowsB[rowIndex];
        this.events.publish('details', item);
    };
    InventoryPage.prototype.openTabs = function (event, str) {
        if (str == 'Tractor') {
            this.ShowTabs = true;
        }
        else {
            this.ShowTabs = false;
        }
    };
    InventoryPage.prototype.refreshAll = function (all, current) {
        if (all - 1 == current) {
            this.rowsB = this.rowsB.slice();
            this.rowsA = this.rowsA.slice();
        }
    };
    InventoryPage.prototype.tabClick = function () {
        console.log("tab clicked");
        this.rowsB = this.rowsB.slice();
        this.rowsA = this.rowsA.slice();
    };
    InventoryPage.prototype.getFormStore = function () {
        this.afAuth.auth.signInAnonymously();
        this.user = this.afAuth.authState;
        var self = this;
        var loader = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loader.present();
        this.db.collection('inventory').ref.get().then(function (snapshot) {
            if (snapshot.size != 0) {
                var _loop_1 = function (i) {
                    snapshot.docs[i].ref.get().then(function (docshot) {
                        var row_array = docshot.data();
                        if (row_array.categoryOfInventory == "Machinery") {
                            // rowB
                            self.rowsB.push(row_array);
                            self.rowsBIndex.push(docshot.ref.id);
                        }
                        else {
                            self.rowsAIndex.push(docshot.ref.id);
                            self.rowsA.push(row_array);
                        }
                        self.refreshAll(snapshot.size, i);
                        if (snapshot.size - 1 == i) {
                            setTimeout(function () {
                                loader.dismiss();
                            }, 1000);
                        }
                    });
                };
                for (var i = 0; i < snapshot.size; i++) {
                    _loop_1(i);
                }
            }
        });
    };
    InventoryPage = InventoryPage_1 = __decorate([
        Injectable(),
        IonicPage(),
        Component({
            selector: 'inventory',
            templateUrl: 'inventory.html'
        }),
        __metadata("design:paramtypes", [LoadingController, Events, AngularFireAuth, AngularFirestore, NavController, NavParams, NavProxyService])
    ], InventoryPage);
    return InventoryPage;
    var InventoryPage_1;
}(_DetailPage));
export { InventoryPage };
//# sourceMappingURL=inventory.js.map