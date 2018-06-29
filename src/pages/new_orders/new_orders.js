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
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { _DetailPage } from '../';
import { NavProxyService } from '../../services/NavProxy.service';
import { ConfirmOrderPage } from '../confirm_orders/confirm_orders';
import { Events } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as $ from "jquery";
import * as firebase from 'firebase/app';
var NewOrdersPage = /** @class */ (function (_super) {
    __extends(NewOrdersPage, _super);
    function NewOrdersPage(loadingCtrl, afAuth, db, events, navCtrl, platform, http, navParams, navProxy, storage) {
        var _this = _super.call(this) || this;
        _this.loadingCtrl = loadingCtrl;
        _this.afAuth = afAuth;
        _this.db = db;
        _this.events = events;
        _this.navCtrl = navCtrl;
        _this.http = http;
        _this.navParams = navParams;
        _this.navProxy = navProxy;
        _this.storage = storage;
        _this.myDatePickerOptions = {
            dateFormat: 'dd/mm/yyyy',
        };
        _this.weekday = { 0: "Sun", 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat" };
        _this.model_date = { date: { year: 2018, month: 10, day: 9 } };
        _this.local_newOrderArray = {
            product_name: "",
            product_date: "",
            product_hour: "",
            product_start_time: "",
            product_time: "",
            location_distrct: "",
            location_taluk: "",
            location_hobli: "",
            location_village_name: "",
            customer_name: "",
            customer_id: "",
            order_id: "",
            id: "",
        };
        _this.disableUntil = {
            year: "",
            month: "",
            day: "",
        };
        _this.config = {
            displayKey: "name",
            search: true,
        };
        _this.stringOptions = [
            "Burns Dalton", "Mcintyre Lawson", "Amie Franklin", "Jocelyn Horton", "Fischer Erickson", "Medina Underwood", "Goldie Barber"
        ];
        _this.DistrictOption = ["No Data"];
        _this.TalukOption = ["No Data"];
        _this.HobliOption = ["No Data"];
        _this.DistrictArray = [];
        _this.TalukArray = [];
        _this.HobliArray = [];
        _this.district_able = 'false';
        _this.taluk_able = 'false';
        _this.hobli_able = 'false';
        _this.database = firebase.database();
        var date = new Date();
        _this.product_date = { date: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } };
        // this.product_start_time = date.getHours() + ":" + date.getMinutes();
        _this.product_start_time = date.getHours() + ":00";
        var dateuntil = date.setDate(date.getDate() - 1);
        _this.disableUntil.year = date.getFullYear();
        _this.disableUntil.month = date.getMonth();
        _this.disableUntil.day = date.getDate();
        var self = _this;
        var data = navParams.data;
        if (typeof (data.length) != 'undefined' && data.length != 0) {
            _this.product_name = _this.local_newOrderArray.product_name = data.product_name;
            _this.product_date = _this.local_newOrderArray.product_date = data.product_date;
            _this.local_newOrderArray.prduct_date_string = data.prduct_date_string;
            _this.product_hour = _this.local_newOrderArray.product_hour = data.product_hour;
            _this.product_start_time = _this.local_newOrderArray.product_start_time = data.product_start_time;
            _this.local_newOrderArray.location_distrct = data.location_distrct;
            _this.local_newOrderArray.location_taluk = data.location_taluk;
            _this.local_newOrderArray.location_hobli = data.location_hobli;
            _this.local_newOrderArray.location_village_name = data.location_village_name;
            _this.customer_name = _this.local_newOrderArray.customer_name = data.customer_name;
            _this.customer_id = _this.local_newOrderArray.customer_id = data.customer_id;
            _this.id = _this.local_newOrderArray.id = data.id;
        }
        return _this;
    }
    NewOrdersPage.prototype.nextOrder = function (event) {
        this.writeNewOrder();
    };
    NewOrdersPage.prototype.changeDistrictValue = function (event, type) {
        var _this = this;
        $('background').click();
        if (type == 'district') {
            this.taluk_able = 'false';
            this.hobli_able = 'false';
            if (event.value.length != 0) {
                var loader_1 = this.loadingCtrl.create({
                    content: 'Please wait...'
                });
                loader_1.present();
                if (this.DistrictArray.length != 0) {
                    var tempDis = this.DistrictArray.filter(function (d) {
                        return d.name == event.value[0];
                    });
                    if (this.TalukArray.length != 0) {
                        var temp = this.TalukArray.filter(function (d) {
                            return d.district == tempDis[0].id;
                        });
                        if (temp.length != 0) {
                            this.TalukOption = [];
                            this.location_taluk = [];
                            for (var i = 0; i < temp.length; i++) {
                                this.TalukOption.push(temp[i].name);
                                if (i + 1 == temp.length) {
                                    setTimeout(function () {
                                        loader_1.dismiss();
                                        _this.taluk_able = 'true';
                                    }, 1000);
                                }
                            }
                        }
                        else {
                            setTimeout(function () {
                                loader_1.dismiss();
                            }, 1000);
                        }
                    }
                    else {
                        setTimeout(function () {
                            loader_1.dismiss();
                        }, 1000);
                    }
                }
                else {
                    setTimeout(function () {
                        loader_1.dismiss();
                    }, 1000);
                }
            }
            // location_distrct
        }
        else if (type == 'taluk') {
            this.hobli_able = 'false';
            if (event.value.length != 0) {
                // this.taluk_able = 'false';
                var loader_2 = this.loadingCtrl.create({
                    content: 'Please wait...'
                });
                loader_2.present();
                if (this.TalukArray.length != 0) {
                    var tempTalu = this.TalukArray.filter(function (d) {
                        return d.name == event.value[0];
                    });
                    if (this.HobliArray.length != 0) {
                        var temp = this.HobliArray.filter(function (d) {
                            return d.taluk == tempTalu[0].id;
                        });
                        if (temp.length != 0) {
                            this.location_hobli = [];
                            this.HobliOption = [];
                            for (var i = 0; i < temp.length; i++) {
                                this.HobliOption.push(temp[i].name);
                                if (i + 1 == temp.length) {
                                    this.hobli_able = 'true';
                                    setTimeout(function () {
                                        loader_2.dismiss();
                                        _this.hobli_able = 'true';
                                    }, 1000);
                                }
                            }
                        }
                        else {
                            setTimeout(function () {
                                loader_2.dismiss();
                            }, 1000);
                        }
                    }
                    else {
                        setTimeout(function () {
                            loader_2.dismiss();
                        }, 1000);
                    }
                }
                else {
                    setTimeout(function () {
                        loader_2.dismiss();
                    }, 1000);
                }
            }
            // location_taluk
        }
        else if (type == 'hobli') {
            // location_hobli
        }
    };
    NewOrdersPage.prototype.ngOnInit = function () {
        this.getLocationData();
    };
    NewOrdersPage.prototype.getLocationData = function () {
        var loader = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loader.present();
        var self = this;
        self.afAuth.auth.signInAnonymously();
        self.user = self.afAuth.authState;
        self.db.collection('district/').ref.get().then(function (snapshot) {
            var length = snapshot.size;
            self.DistrictOption = [];
            var _loop_1 = function (i) {
                snapshot.docs[i].ref.get().then(function (docshot) {
                    docshot.data();
                    var celldata = {
                        id: docshot.ref.id,
                        name: docshot.data()['name'],
                    };
                    self.DistrictArray.push(celldata);
                    self.DistrictOption.push(celldata.name);
                    if (i + 1 == snapshot.docs.length) {
                        self.district_able = 'true';
                    }
                });
            };
            for (var i = 0; i < snapshot.docs.length; i++) {
                _loop_1(i);
            }
        });
        self.db.collection('taluk/').ref.get().then(function (snapshot) {
            var length = snapshot.size;
            self.TalukOption = [];
            var _loop_2 = function (i) {
                snapshot.docs[i].ref.get().then(function (docshot) {
                    var district = docshot.data()['district'];
                    if (district.length != null) {
                        var temp = String(district).split('/');
                        if (temp.length != 0) {
                            district = temp[temp.length - 1];
                        }
                        else {
                            district = "";
                        }
                    }
                    var celldata = {
                        id: docshot.ref.id,
                        name: docshot.data()['name'],
                        district: district,
                    };
                    self.TalukArray.push(celldata);
                    self.TalukOption.push(celldata.name);
                    if (i + 1 == snapshot.docs.length) {
                        // self.taluk_able = 'true';
                    }
                });
            };
            for (var i = 0; i < snapshot.docs.length; i++) {
                _loop_2(i);
            }
        });
        self.db.collection('hobli/').ref.get().then(function (snapshot) {
            var length = snapshot.size;
            self.HobliOption = [];
            var _loop_3 = function (i) {
                snapshot.docs[i].ref.get().then(function (docshot) {
                    var taluk = docshot.data()['taluk'];
                    if (taluk.length != 0) {
                        var temp = String(taluk).split('/');
                        if (temp.length != 0) {
                            taluk = temp[temp.length - 1];
                        }
                        else {
                            taluk = "";
                        }
                    }
                    var celldata = {
                        id: docshot.ref.id,
                        name: docshot.data()['name'],
                        taluk: taluk,
                    };
                    self.HobliArray.push(celldata);
                    self.HobliOption.push(celldata.name);
                    if (i + 1 == snapshot.docs.length) {
                        // self.hobli_able = 'true';
                        setTimeout(function () {
                            loader.dismiss();
                        }, 1000);
                    }
                });
            };
            for (var i = 0; i < snapshot.docs.length; i++) {
                _loop_3(i);
            }
        });
    };
    NewOrdersPage.prototype.writeNewOrder = function () {
        if (typeof (this.product_name) == 'undefined' ||
            typeof (this.product_date) == 'undefined' ||
            typeof (this.product_hour) == 'undefined' ||
            typeof (this.product_start_time) == 'undefined' ||
            typeof (this.location_distrct) == 'undefined' ||
            typeof (this.location_taluk) == 'undefined' ||
            typeof (this.location_hobli) == 'undefined' ||
            typeof (this.location_village_name) == 'undefined' ||
            typeof (this.customer_name) == 'undefined' ||
            typeof (this.customer_id) == 'undefined' ||
            this.product_name == "" ||
            this.product_date == "" ||
            this.product_hour == "" ||
            this.product_start_time == "" ||
            this.location_distrct == "" ||
            this.location_taluk == "" ||
            this.location_hobli == "" ||
            this.location_village_name == "" ||
            this.customer_name == "" ||
            this.customer_id == "") {
            debugger;
            alert("Please write all data");
            return;
        }
        else {
            var self = this;
            this.local_newOrderArray.product_name = this.product_name;
            this.local_newOrderArray.product_date = this.product_date;
            this.local_newOrderArray.prduct_date_string = self.product_date.date.day + '/' + self.product_date.date.month + '/' + self.product_date.date.year;
            this.local_newOrderArray.product_hour = this.product_hour;
            this.local_newOrderArray.product_start_time = this.product_start_time;
            this.local_newOrderArray.location_distrct = this.location_distrct;
            this.local_newOrderArray.location_taluk = this.location_taluk;
            this.local_newOrderArray.location_hobli = this.location_hobli;
            this.local_newOrderArray.location_village_name = this.location_village_name;
            this.local_newOrderArray.customer_name = this.customer_name;
            this.local_newOrderArray.customer_id = this.customer_id;
            this.local_newOrderArray.id = this.id;
            var hour = String(this.product_start_time).split(":")[0];
            var min = String(this.product_start_time).split(":")[1];
            min = "00";
            var forwardDate = new Date();
            var forward = forwardDate.setFullYear(this.product_date.date.year, this.product_date.date.month - 1, this.product_date.date.day);
            forwardDate.setHours(parseInt(hour) + parseInt(this.product_hour) + 1, parseInt(min));
            if ((parseInt(hour) + parseInt(this.product_hour) + 1) > 24) {
                var addTime = (parseInt(hour) + parseInt(this.product_hour) + 1) - 24;
                var addDay = Math.floor(addTime / 24);
                forwardDate.setDate(forwardDate.getDate() + addDay);
            }
            var endDate = new Date();
            var end = endDate.setFullYear(this.product_date.date.year, this.product_date.date.month - 1, this.product_date.date.day);
            endDate.setHours(parseInt(hour) + parseInt(this.product_hour), parseInt(min));
            if ((parseInt(hour) + parseInt(this.product_hour)) > 24) {
                var addTime = (parseInt(hour) + parseInt(this.product_hour)) - 24;
                var addDay = Math.floor(addTime / 24);
                endDate.setDate(endDate.getDate() + addDay);
            }
            var tempDate = new Date();
            tempDate.setFullYear(this.product_date.date.year, this.product_date.date.month - 1, this.product_date.date.day);
            var start_weekday = tempDate.getDay();
            var startTime = {
                year: this.product_date.date.year,
                month: this.product_date.date.month,
                day: this.product_date.date.day,
                hour: hour,
                min: min,
                weekday: this.weekday[start_weekday],
            };
            var endTime = {
                year: endDate.getFullYear(),
                month: endDate.getMonth() + 1,
                day: endDate.getDate(),
                hour: endDate.getHours(),
                min: endDate.getMinutes(),
                weekday: this.weekday[endDate.getDay()]
            };
            var forwardTime = {
                year: forwardDate.getFullYear(),
                month: forwardDate.getMonth() + 1,
                day: forwardDate.getDate(),
                hour: forwardDate.getHours(),
                min: forwardDate.getMinutes(),
                weekday: this.weekday[forwardDate.getDay()]
            };
            var time = {
                startTime: startTime,
                endTime: endTime,
                forwardTime: forwardTime
            };
            this.local_newOrderArray.product_time = time;
            this.storage.set('local_newOrder', this.local_newOrderArray);
            // this.events.publish("local_newOrder",this.local_newOrderArray);
            self.navProxy.pushDetail(ConfirmOrderPage, this.local_newOrderArray);
            // firebase.database().ref('orders_timeline/').once('value').then(function(snapshot) {
            //     let length = snapshot.numChildren();
            //     firebase.database().ref('orders_timeline/'+length).set({
            //     order_timeline_id : length + ':' + self.customer_id,
            //     start_time : startTime,
            //     end_time : endTime,
            //     forward_time : forwardTime
            //   });
            //   self.navProxy.pushDetail( ConfirmOrderPage, null);
            // });
        }
    };
    NewOrdersPage = __decorate([
        IonicPage(),
        Component({
            selector: 'new_orders',
            templateUrl: 'new_orders.html'
        }),
        __metadata("design:paramtypes", [LoadingController, AngularFireAuth, AngularFirestore, Events, NavController, Platform, Http, NavParams, NavProxyService, Storage])
    ], NewOrdersPage);
    return NewOrdersPage;
}(_DetailPage));
export { NewOrdersPage };
//# sourceMappingURL=new_orders.js.map