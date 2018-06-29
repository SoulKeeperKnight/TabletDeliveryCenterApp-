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
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { _DetailPage } from '../';
import { NavProxyService } from '../../services/NavProxy.service';
import { NewOrdersPage } from '../new_orders/new_orders';
import { OrdersPage } from '../orders/orders';
import * as $ from "jquery";
import { Events } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatatableComponent } from '@swimlane/ngx-datatable/release/components/datatable.component';
var ConfirmOrderPage = /** @class */ (function (_super) {
    __extends(ConfirmOrderPage, _super);
    function ConfirmOrderPage(loadingCtrl, cd, platform, events, afAuth, db, navCtrl, http, navParams, navProxy) {
        var _this = _super.call(this) || this;
        _this.loadingCtrl = loadingCtrl;
        _this.cd = cd;
        _this.platform = platform;
        _this.events = events;
        _this.afAuth = afAuth;
        _this.db = db;
        _this.navCtrl = navCtrl;
        _this.http = http;
        _this.navParams = navParams;
        _this.navProxy = navProxy;
        _this.rows = [];
        _this.selected = [];
        _this.checkedValue = [];
        _this.allbuffer = [];
        platform.ready().then(function () {
            _this.rows = [];
            _this.localbuffer = [];
            _this.allbuffer = [];
            var data_order = navParams.data;
            var self = _this;
            if (data_order != null) {
                self.localbuffer = data_order;
                self.getData();
            }
            events.subscribe('rowsChange', function (val, buffer, allbuffer) {
                self.rows = new Array();
                var unique = val.filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                });
                self.rows = unique;
                self.localbuffer = new Array();
                self.localbuffer = buffer;
                self.allbuffer = new Array();
                var unique2 = allbuffer.filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                });
                self.allbuffer = unique2;
                // self.getData();
            });
            var k = 10;
            _this.checkedValue = new Array(k);
            // this.getJSON().subscribe(data =>{
            //     this.rows=data.technologies;
            // }, error => console.log(error));
            _this.columns = [
                { name: 'confirm_time', prop: 'confirm_time' },
                { name: 'confirm_date', prop: 'confirm_date' },
                { name: 'confirm_week', prop: 'confirm_week' },
            ];
            _this.disableList = "Ionic Framework";
        });
        return _this;
    }
    ConfirmOrderPage.prototype.ngOnInit = function () {
        var _this = this;
        $('.modal-alert').css('display', 'none');
        var self = this;
        $('.alert-exit-btn').click(function () {
            $('.modal-alert').css('display', 'none');
        });
        $('.table-back').click(function () {
            self.navProxy.pushDetail(NewOrdersPage, self.localbuffer);
        });
        $('.table-title').click(function () {
            self.navProxy.pushDetail(OrdersPage, null);
        });
        $('.table-header-title').click(function () {
            self.clearSelect();
        });
        this.events.subscribe('local_newOrder', function (val) {
            self.localbuffer = val;
            self.getData();
        });
        setInterval(function () {
            if ((typeof (self.select_val) != 'undefined' && self.select_val != self.pre_select_val) || _this.pre_select_val == "clear") {
                setTimeout(function () {
                    if (typeof (self.select_val) != 'undefined') {
                        self.selected.push(self.select_val);
                        self.selected = self.selected.slice();
                    }
                }, 1);
                self.pre_select_val = self.select_val;
            }
        }, 1);
    };
    ConfirmOrderPage.prototype.getJSON = function () {
        return this.http.get("./assets/data/techologies.json")
            .map(function (res) { return res.json(); });
    };
    ConfirmOrderPage.prototype.nextOrder = function (event) {
        if (this.select_val) {
            this.sendData();
        }
    };
    ConfirmOrderPage.prototype.sendNext = function (event) {
        this.navProxy.pushDetail(OrdersPage, null);
    };
    ConfirmOrderPage.prototype.clearSelect = function () {
        this.selected = [];
    };
    ConfirmOrderPage.prototype.onSelect = function (_a) {
        var _this = this;
        var selected = _a.selected;
        //    setTimeout(()=>{
        //      ;
        //     this.select_val =  selected[0];
        //     this.selected = [];
        //    },10);
        if (typeof (selected) == 'undefined' || selected.length == 0) {
            this.pre_select_val = "clear";
        }
        this.select_val = selected[selected.length - 1];
        setTimeout(function () {
            _this.selected = [];
        }, 1);
    };
    ConfirmOrderPage.prototype.onActivate = function (event) {
        // console.log('Activate Event', event);
    };
    ConfirmOrderPage.prototype.displayCheck = function (row) {
        return row.name !== 'Ethel Price';
    };
    ConfirmOrderPage.prototype.checkSelectable = function (event) {
        console.log('Checking if selectable', event);
        return event["Order ID"] !== "Ionic Framework";
    };
    ConfirmOrderPage.prototype.getRowClass = function (row) {
        return {
            'row-disable': row.disable == "true"
        };
    };
    ConfirmOrderPage.prototype.onCheckboxChangeFn = function (event) {
        this.checkedValue;
        ;
    };
    ConfirmOrderPage.prototype.sendData = function () {
        var loader = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loader.present();
        var self = this;
        self.afAuth.auth.signInAnonymously();
        self.user = self.afAuth.authState;
        if (typeof (self.localbuffer.id) != 'undefined' && self.localbuffer.id.length != 0) {
            self.db.collection('orders/').ref.get().then(function (snapshot) {
                var length = snapshot.size;
                self.localbuffer.order_id = String(length);
                snapshot.docs.find(function (item) { return item.id == self.localbuffer.id; }).ref.update(self.localbuffer).then(function () {
                    self.navProxy.pushDetail(OrdersPage, null);
                    setTimeout(function () {
                        loader.dismiss();
                    }, 1000);
                });
            });
        }
        else {
            self.db.collection('orders/').ref.get().then(function (snapshot) {
                var length = snapshot.size;
                self.localbuffer.id = '';
                self.localbuffer.order_id = String(length);
                self.db.collection('orders').add(self.localbuffer).then(function (ref) {
                    // $('.modal-alert').css('display','block');   
                    self.navProxy.pushDetail(OrdersPage, null);
                    setTimeout(function () {
                        loader.dismiss();
                    }, 1000);
                });
            });
        }
    };
    ConfirmOrderPage.prototype.getData = function () {
        var self = this;
        var date = new Date();
        // let year = date.getFullYear();
        // let month = date.getMonth() + 1;
        // let day = date.getDate();
        var loader = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loader.present();
        var year = self.localbuffer.product_time.startTime.year;
        var month = self.localbuffer.product_time.startTime.month;
        var day = self.localbuffer.product_time.startTime.day;
        this.db.collection('orders/').ref.get().then(function (snapshot) {
            var max_forward_time = 0;
            var order_time = parseInt(self.localbuffer.product_time.startTime.year) * 1000000 + parseInt(self.localbuffer.product_time.startTime.month) * 10000 + parseInt(self.localbuffer.product_time.startTime.day) * 100 + parseInt(self.localbuffer.product_time.startTime.hour);
            ;
            if (snapshot.docs.length != 0) {
                var total_buffer_1 = [];
                var _loop_1 = function (i) {
                    snapshot.docs[i].ref.get().then(function (docshot) {
                        if (self.localbuffer.id != docshot.id) {
                            total_buffer_1.push(docshot.data());
                        }
                        if (i + 1 == snapshot.docs.length) {
                            self.rows = [];
                            var temp = total_buffer_1.filter(function (d) {
                                return (d.product_date.date.year == year && d.product_date.date.month == month && d.product_date.date.day == day) ||
                                    (d.product_time.startTime.year == year && d.product_time.startTime.month == month && d.product_time.startTime.day == day) ||
                                    (d.product_time.endTime.year == year && d.product_time.endTime.month == month && d.product_time.endTime.day == day) ||
                                    (d.product_time.forwardTime.year == year && d.product_time.forwardTime.month == month && d.product_time.forwardTime.day == day);
                            });
                            self.allbuffer = temp;
                            for (var i_1 = 0; i_1 < temp.length; i_1++) {
                                var buffer = temp[i_1].product_time;
                                var minDate = parseInt(buffer.forwardTime.year) * 1000000 + parseInt(buffer.forwardTime.month) * 10000 + parseInt(buffer.forwardTime.day) * 100 + parseInt(buffer.forwardTime.hour);
                                if (max_forward_time < minDate) {
                                    max_forward_time = minDate;
                                }
                                var time_1 = String(parseInt(buffer.startTime.hour) % 12) + ":" + String(buffer.startTime.min);
                                if (buffer.startTime.hour > 12) {
                                    time_1 = time_1 + " PM";
                                }
                                else {
                                    time_1 = time_1 + " AM";
                                }
                                var date_1 = buffer.startTime.day + "/" + buffer.startTime.month + "/" + buffer.startTime.year;
                                var weekday_1 = buffer.startTime.weekday;
                                var disable_1 = 'true';
                                var minStartDate = parseInt(buffer.startTime.year) * 1000000 + parseInt(buffer.startTime.month) * 10000 + parseInt(buffer.startTime.day) * 100 + parseInt(buffer.startTime.hour);
                                // if (order_time < minStartDate) {
                                //     disable = false;
                                // }
                                var cell_1 = {
                                    id: i_1,
                                    confirm_time: time_1,
                                    confirm_date: date_1,
                                    confirm_week: weekday_1,
                                    disable: disable_1,
                                };
                                self.rows.push(cell_1);
                            }
                            self.rows = self.rows.slice(0, temp.length);
                            var time = String(parseInt(self.localbuffer.product_time.startTime.hour) % 12) + ":" + String(self.localbuffer.product_time.startTime.min);
                            if (self.localbuffer.product_time.startTime.hour > 12) {
                                time = time + " PM";
                            }
                            else {
                                time = time + " AM";
                            }
                            var date_2 = self.localbuffer.product_time.startTime.day + "/" + self.localbuffer.product_time.startTime.month + "/" + self.localbuffer.product_time.startTime.year;
                            var weekday = self.localbuffer.product_time.startTime.weekday;
                            var disable = 'true';
                            if (order_time >= max_forward_time) {
                                disable = 'false';
                            }
                            var cell = {
                                id: self.allbuffer.length,
                                confirm_time: time,
                                confirm_date: date_2,
                                confirm_week: weekday,
                                disable: disable,
                            };
                            self.rows.push(cell);
                            self.allbuffer.push(self.localbuffer);
                            self.events.publish("rowsChange", self.rows, self.localbuffer, self.allbuffer);
                            setTimeout(function () {
                                loader.dismiss();
                            }, 1000);
                        }
                    });
                };
                for (var i = 0; i < snapshot.docs.length; i++) {
                    _loop_1(i);
                }
            }
            else {
                var time = String(parseInt(self.localbuffer.product_time.startTime.hour) % 12) + ":" + String(self.localbuffer.product_time.startTime.min);
                if (self.localbuffer.product_time.startTime.hour > 12) {
                    time = time + " PM";
                }
                else {
                    time = time + " AM";
                }
                var date_3 = self.localbuffer.product_time.startTime.day + "/" + self.localbuffer.product_time.startTime.month + "/" + self.localbuffer.product_time.startTime.year;
                var weekday = self.localbuffer.product_time.startTime.weekday;
                var disable = 'true';
                if (order_time >= max_forward_time) {
                    disable = 'false';
                }
                var cell = {
                    id: self.allbuffer.length,
                    confirm_time: time,
                    confirm_date: date_3,
                    confirm_week: weekday,
                    disable: disable,
                };
                self.rows.push(cell);
                self.allbuffer.push(self.localbuffer);
                self.events.publish("rowsChange", self.rows, self.localbuffer, self.allbuffer);
                setTimeout(function () {
                    loader.dismiss();
                }, 1000);
            }
        });
    };
    __decorate([
        ViewChild('table'),
        __metadata("design:type", DatatableComponent)
    ], ConfirmOrderPage.prototype, "table", void 0);
    ConfirmOrderPage = __decorate([
        IonicPage(),
        Component({
            selector: 'confirm_orders',
            templateUrl: ' confirm_orders.html'
        }),
        __metadata("design:paramtypes", [LoadingController, ChangeDetectorRef, Platform, Events, AngularFireAuth, AngularFirestore, NavController, Http, NavParams, NavProxyService])
    ], ConfirmOrderPage);
    return ConfirmOrderPage;
}(_DetailPage));
export { ConfirmOrderPage };
//# sourceMappingURL=confirm_orders.js.map