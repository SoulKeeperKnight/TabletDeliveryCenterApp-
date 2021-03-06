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
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { _DetailPage } from '../';
import { DatatableComponent } from '@swimlane/ngx-datatable/release/components/datatable.component';
import { Page } from "../../provider/model";
import * as $ from "jquery";
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Events } from 'ionic-angular';
import { NavProxyService } from '../../services/NavProxy.service';
import { NewOrdersPage } from '../../pages/new_orders/new_orders';
var OrdersPage = /** @class */ (function (_super) {
    __extends(OrdersPage, _super);
    function OrdersPage(navProxy, loadingCtrl, events, afAuth, db, navCtrl, http, navParams) {
        var _this = _super.call(this) || this;
        _this.navProxy = navProxy;
        _this.loadingCtrl = loadingCtrl;
        _this.events = events;
        _this.afAuth = afAuth;
        _this.db = db;
        _this.navCtrl = navCtrl;
        _this.http = http;
        _this.navParams = navParams;
        _this.page = new Page();
        _this.rows = [];
        _this.temp_rows = [];
        _this.selected = [];
        _this.page_size = 10;
        _this.loading = false;
        _this.item = navParams.data;
        _this.columns = [
            { prop: 'order_id' },
            { prop: 'prduct_date_string' },
            { prop: 'customer_name' },
            { prop: 'Details' },
            { prop: 'Driver ID' },
            { prop: 'Order Value' },
            { prop: 'Special Action' }
        ];
        var self = _this;
        events.subscribe('showTodayOrders', function (rows) {
            self.rows = new Array();
            self.rows = rows;
            self.temp_rows = new Array();
            self.temp_rows = self.rows.slice();
        });
        _this.getTodayOrders();
        return _this;
        //   this.getJSON().subscribe(data => {
        //             this.rows=data.technologies;
        //             this.temp_rows = [...this.rows];
        //         }, error => console.log(error));
    }
    OrdersPage.prototype.onSort = function (event) {
        var _this = this;
        // event was triggered, start sort sequence
        console.log('Sort Event', event);
        this.loading = true;
        // emulate a server request with a timeout
        setTimeout(function () {
            var rows = _this.rows.slice();
            // this is only for demo purposes, normally
            // your server would return the result for
            // you and you would just set the rows prop
            var sort = event[0];
            ;
            rows.sort(function (a, b) {
                return a[sort.prop].localeCompare(b[sort.prop]) * (sort.dir === 'desc' ? -1 : 1);
            });
            _this.rows = rows;
            _this.loading = false;
        }, 1000);
    };
    OrdersPage.prototype.setPage = function (pageInfo) {
        var _this = this;
        this.page.pageNumber = pageInfo.offset;
        this.getJSON().subscribe(function (data) {
            ;
            _this.rows = data.technologies;
            _this.page.size = _this.page_size;
            _this.page.totalElements = _this.rows.length;
            _this.page.totalPages = Math.floor(_this.rows.length / _this.page.size) + 1;
            var start = _this.page.pageNumber * _this.page_size;
            var end = Math.min((start + _this.page_size), _this.rows.length);
            var buffer = new Array();
            for (var i = start; i < end; i++) {
                buffer.push(_this.rows[i]);
            }
            _this.rows = buffer;
            _this.rows = _this.rows.slice();
        }, function (error) { return console.log(error); });
        console.log("page set");
    };
    OrdersPage.prototype.ngOnInit = function () {
        var self = this;
        $(".table-search-btn").click(function () {
            $('.model-view').css('display', 'block');
        });
        $('#search-value-1').click(function () {
            $('#search-value').html("By Date");
            self.sort_num = 1;
        });
        $('#search-value-2').click(function () {
            $('#search-value').html("By Customer name");
            self.sort_num = 2;
        });
        $('#search-value-3').click(function () {
            $('#search-value').html("By Driver name");
            self.sort_num = 3;
        });
        $('#search-value-4').click(function () {
            $('#search-value').html("By Order no");
            self.sort_num = 4;
        });
        $('#search-start').click(function () {
            self.sortTable();
            $('.model-view').css('display', 'none');
        });
        this.sort_value = [{ prop: 'order_id', dir: 'asc' }];
        // this.setPage({ offset: 0 });
        // let event = [{ prop: 'order_id', dir: 'asc' }];
        // this.onSort(event);
        this.events.subscribe('deleteOrder_confirm', function (delete_flag, delete_index) {
            if (self.delete_start != true) {
                self.delete_start = true;
                var delete_id_1;
                if (typeof (self.temp_rows) != 'undefined' && typeof (self.temp_rows[delete_index]) != 'undefined' && typeof (self.temp_rows[delete_index].id) != 'undefined') {
                    delete_id_1 = self.temp_rows[delete_index].id;
                    self.temp_rows.splice(delete_index, 1);
                    self.temp_rows = self.temp_rows.slice();
                    self.rows = new Array();
                    self.rows = self.temp_rows;
                    self.events.publish('showTodayOrders', self.temp_rows);
                    var loader_1 = self.loadingCtrl.create({
                        content: 'Please wait...'
                    });
                    loader_1.present();
                    self.db.collection('orders').ref.get().then(function (snapshot) {
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
            }
        });
    };
    OrdersPage.prototype.getJSON = function () {
        return this.http.get("./assets/data/techologies.json")
            .map(function (res) { return res.json(); });
    };
    OrdersPage.prototype.sortTable = function () {
        if (this.sort_num == 1) {
            // this.sort_value = [{ prop: 'prduct_date_string', dir: 'asc' }];
            $('#sort2').click();
        }
        if (this.sort_num == 2) {
            // this.sort_value = [{ prop: 'customer_name', dir: 'asc' }];
            $('#sort3').click();
        }
        if (this.sort_num == 3) {
            // this.sort_value = [{ prop: 'Driver ID', dir: 'asc' }];
            $('#sort4').click();
        }
        if (this.sort_num == 4) {
            // this.sort_value = [{ prop: 'order_id', dir: 'asc' }];
            $('#sort1').click();
        }
    };
    OrdersPage.prototype.updateFilter = function (event) {
        var val = event.target.value.toLowerCase();
        var temp = this.temp_rows.filter(function (d) {
            return (d["order_id"].toLowerCase().indexOf(val) !== -1 || !val) ||
                (d["prduct_date_string"].toLowerCase().indexOf(val) !== -1 || !val) ||
                (d["customer_name"].toLowerCase().indexOf(val) !== -1 || !val);
            //  ||
            // (d["Details"].toLowerCase().indexOf(val) !== -1 || !val) ||
            // (d["Order Value"].toLowerCase().indexOf(val) !== -1 || !val) ||
            // (d["Driver ID"].toLowerCase().indexOf(val) !== -1 || !val)
        });
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    };
    OrdersPage.prototype.onSpecialAction = function (row, action, rowIndex) {
        if (action == 'delete') {
            this.events.publish('order_delete', row.order_id, rowIndex);
        }
        else {
            if (rowIndex > -1) {
                this.navProxy.pushDetail(NewOrdersPage, this.rows[rowIndex]);
            }
        }
    };
    OrdersPage.prototype.onShowDetails = function (row, rowIndex) {
        var item = this.rows[rowIndex];
        this.events.publish('order_details', item);
    };
    OrdersPage.prototype.getTodayOrders = function () {
        var self = this;
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        // firebase.database().ref('orders/').on('value',function(snapshot) {
        //     if (snapshot.numChildren() != 0) {
        //         const temp = snapshot.val().filter(function(d){
        //             return (d.product_date.date.year == year && d.product_date.date.month == month && d.product_date.date.day == day) ||
        //             (d.product_time.startTime.year == year && d.product_time.startTime.month == month && d.product_time.startTime.day == day) || 
        //             (d.product_time.endTime.year == year && d.product_time.endTime.month == month && d.product_time.endTime.day == day) || 
        //             (d.product_time.forwardTime.year == year && d.product_time.forwardTime.month == month && d.product_time.forwardTime.day == day);
        //         });
        //         self.rows= temp;
        //         self.temp_rows = [...self.rows];
        //     }
        // });
        var loader = self.loadingCtrl.create({
            content: 'Please wait...'
        });
        loader.present();
        this.afAuth.auth.signInAnonymously();
        this.user = this.afAuth.authState;
        this.db.collection('orders').ref.get().then(function (snapshot) {
            if (snapshot.size != 0) {
                var doc_ids = [];
                var _loop_1 = function (i) {
                    snapshot.docs[i].ref.get().then(function (docshot) {
                        var row_array = docshot.data();
                        row_array.id = new String();
                        row_array.id = docshot.id;
                        self.rows.push(row_array);
                        if (i + 1 == snapshot.size) {
                            var temp = self.rows.filter(function (d) {
                                return (d.product_date.date.year == year && d.product_date.date.month == month && d.product_date.date.day == day) ||
                                    (d.product_time.startTime.year == year && d.product_time.startTime.month == month && d.product_time.startTime.day == day) ||
                                    (d.product_time.endTime.year == year && d.product_time.endTime.month == month && d.product_time.endTime.day == day) ||
                                    (d.product_time.forwardTime.year == year && d.product_time.forwardTime.month == month && d.product_time.forwardTime.day == day);
                            });
                            self.events.publish('showTodayOrders', temp);
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
            else {
                setTimeout(function () {
                    loader.dismiss();
                }, 1000);
            }
        }).catch(function () {
            setTimeout(function () {
                loader.dismiss();
            }, 1000);
        });
    };
    __decorate([
        ViewChild('table'),
        __metadata("design:type", DatatableComponent)
    ], OrdersPage.prototype, "table", void 0);
    OrdersPage = __decorate([
        IonicPage(),
        Component({
            selector: 'orders',
            templateUrl: 'orders.html'
        }),
        __metadata("design:paramtypes", [NavProxyService, LoadingController, Events, AngularFireAuth, AngularFirestore, NavController, Http, NavParams])
    ], OrdersPage);
    return OrdersPage;
}(_DetailPage));
export { OrdersPage };
//# sourceMappingURL=orders.js.map