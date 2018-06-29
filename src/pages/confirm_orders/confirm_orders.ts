import { Component,ViewChild, ChangeDetectorRef  } from '@angular/core';
import { IonicPage, NavController, NavParams, Item, Nav, Platform, LoadingController } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { _DetailPage } from '../';
import { NavProxyService } from '../../services/NavProxy.service';
import { NewOrdersPage } from '../new_orders/new_orders';
import { OrdersPage } from '../orders/orders';
import { PlaceholderPage } from '../../pages/placeholder/placeholder';
import * as $ from "jquery";
import * as firebase from 'firebase/app';
import { Events } from 'ionic-angular';

import { AngularFirestore ,AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { DatatableComponent } from '@swimlane/ngx-datatable/release/components/datatable.component';

export interface Config {
	technologies: string;
}

@IonicPage()
@Component({
  selector: 'confirm_orders',
  templateUrl: ' confirm_orders.html'
})

export class  ConfirmOrderPage extends _DetailPage {

   public config : Config;

   public columns : any;

   public rows: any[] = [];

   public item:any;

   public sort_value: any;
   public sort_num:any;

   public selected = [];

   public select_val :any;
   public pre_select_val :any;

   public disableList : any;

   public localbuffer : any;

   public checkedValue = [];

   public allbuffer = [];

    user: Observable<firebase.User>;
    items: Observable<any[]>;

  @ViewChild('table') table: DatatableComponent;

   constructor(public loadingCtrl: LoadingController, private cd: ChangeDetectorRef, private platform:Platform, public events:Events, public afAuth: AngularFireAuth,public db: AngularFirestore, public navCtrl 	: NavController, private http: Http,public navParams: NavParams ,public navProxy: NavProxyService)
   {
    super();
    platform.ready().then(() => {
        
    this.rows = [];
    this.localbuffer = [];
    this.allbuffer = [];

    let data_order = navParams.data;
    let self = this;
    if (data_order!= null) {
        self.localbuffer = data_order;
        self.getData();
    }

    


    events.subscribe('rowsChange', (val,buffer,allbuffer) => {
        self.rows = new Array();
        var unique = val.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        })
        self.rows = unique;
        self.localbuffer = new Array();
        self.localbuffer = buffer;
        self.allbuffer = new Array();
        var unique2 = allbuffer.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        })
        self.allbuffer = unique2;
        // self.getData();
    });

    let k = 10;
    this.checkedValue = new Array(k);
    // this.getJSON().subscribe(data =>{
    //     this.rows=data.technologies;
    // }, error => console.log(error));

      this.columns = [
        { name: 'confirm_time', prop: 'confirm_time' },
        { name: 'confirm_date', prop: 'confirm_date' },
        { name: 'confirm_week', prop: 'confirm_week' },
      ];
      this.disableList = "Ionic Framework";
    });
   }


   ngOnInit() {
        $('.modal-alert').css('display','none');
        var self = this;
        $('.alert-exit-btn').click(function() {
            $('.modal-alert').css('display','none');
        })
        $('.table-back').click(function() {
            self.navProxy.pushDetail(NewOrdersPage, self.localbuffer);
        });
        $('.table-title').click(function() {
            self.navProxy.pushDetail(OrdersPage, null);
        });
        $('.table-header-title').click(function() {
            self.clearSelect();
        });
        this.events.subscribe('local_newOrder', (val) => {
            self.localbuffer = val;
            self.getData();
        });
        setInterval(()=>{
            if ((typeof(self.select_val)!= 'undefined' && self.select_val != self.pre_select_val) || this.pre_select_val == "clear") {
                setTimeout(()=>{
                    if (typeof(self.select_val) != 'undefined') {
                        self.selected.push(self.select_val);
                        self.selected = [...self.selected];
                    }
                },1);
                self.pre_select_val = self.select_val;
            }
        },1);
    }

   public getJSON(): Observable<any> {
    return this.http.get("./assets/data/techologies.json")
                    .map((res:any) => res.json());

    }
    nextOrder(event) {
        if (this.select_val) {
            this.sendData();
        }
    }
    sendNext (event) {
        this.navProxy.pushDetail( OrdersPage, null);
    }
    clearSelect() {
        this.selected = [];
    }
    onSelect({ selected }) {
    //    setTimeout(()=>{
    //      ;
    //     this.select_val =  selected[0];
    //     this.selected = [];
    //    },10);
    if ( typeof(selected) == 'undefined' ||  selected.length == 0) {
        this.pre_select_val = "clear";
    } 
        this.select_val =  selected[selected.length-1];

    setTimeout(()=>{
        this.selected = [];
       },1);
    }
    onActivate(event) {
        // console.log('Activate Event', event);
    }
    displayCheck(row) {
        return row.name !== 'Ethel Price';
    }
    checkSelectable(event) {
        console.log('Checking if selectable', event);
        return event["Order ID"] !== "Ionic Framework";
    }
    getRowClass(row) {
        return {
          'row-disable': row.disable == "true"
        };
    }
    onCheckboxChangeFn(event) {
        this.checkedValue;
         ;
    }

    sendData () {
        let loader =  this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loader.present();
        let self = this;
        self.afAuth.auth.signInAnonymously();
        self.user = self.afAuth.authState;
        
        if ( typeof(self.localbuffer.id) != 'undefined'  && self.localbuffer.id.length != 0) {
            self.db.collection('orders/').ref.get().then(function(snapshot) {
                let length = snapshot.size;
                self.localbuffer.order_id = String(length);
                snapshot.docs.find(item => item.id == self.localbuffer.id).ref.update(self.localbuffer).then(function(){
                    self.navProxy.pushDetail( OrdersPage, null);
                    setTimeout(() => {
                        loader.dismiss();
                    }, 1000);
                });
             });
        } else {
            self.db.collection('orders/').ref.get().then(function(snapshot) {
                let length = snapshot.size;
                self.localbuffer.id = '';
                self.localbuffer.order_id = String(length);
                self.db.collection('orders').add(self.localbuffer).then(function(ref) {
                    // $('.modal-alert').css('display','block');   
                    self.navProxy.pushDetail( OrdersPage, null);
                    setTimeout(() => {
                        loader.dismiss();
                    }, 1000);
                });
            });
        }
        
    }
    getData () {
        var self = this;
        let date = new Date();
        // let year = date.getFullYear();
        // let month = date.getMonth() + 1;
        // let day = date.getDate();

        let loader =  this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loader.present();
        
        let year = self.localbuffer.product_time.startTime.year;
        let month = self.localbuffer.product_time.startTime.month;
        let day = self.localbuffer.product_time.startTime.day;

        this.db.collection('orders/').ref.get().then(function(snapshot) {
            
            let max_forward_time = 0;
            let order_time = parseInt(self.localbuffer.product_time.startTime.year) * 1000000 +  parseInt(self.localbuffer.product_time.startTime.month) * 10000 + parseInt(self.localbuffer.product_time.startTime.day) * 100 + parseInt(self.localbuffer.product_time.startTime.hour);
             ;

                if (snapshot.docs.length != 0) {
                    

                let total_buffer = [];
                for (let i = 0; i < snapshot.docs.length; i++) {
                    snapshot.docs[i].ref.get().then(function(docshot){
                        if (self.localbuffer.id != docshot.id) {
                            total_buffer.push(docshot.data());
                        }
                        if ( i+1 == snapshot.docs.length) {
                                self.rows = [];
                                var temp = total_buffer.filter(function(d) {
                                    return (d.product_date.date.year == year && d.product_date.date.month == month && d.product_date.date.day == day) ||
                                            (d.product_time.startTime.year == year && d.product_time.startTime.month == month && d.product_time.startTime.day == day) || 
                                            (d.product_time.endTime.year == year && d.product_time.endTime.month == month && d.product_time.endTime.day == day) || 
                                            (d.product_time.forwardTime.year == year && d.product_time.forwardTime.month == month && d.product_time.forwardTime.day == day);
                                });
                                self.allbuffer = temp;
 
                                for (let i = 0; i < temp.length; i++) {
                                    let buffer= temp[i].product_time;
                                    let minDate = parseInt(buffer.forwardTime.year) * 1000000 +  parseInt(buffer.forwardTime.month) * 10000 + parseInt(buffer.forwardTime.day) * 100 + parseInt(buffer.forwardTime.hour);
                                    if (max_forward_time < minDate) {
                                        max_forward_time = minDate;
                                    }
                
                                    let time = String(parseInt(buffer.startTime.hour)%12) + ":" + String(buffer.startTime.min);
                                    if ( buffer.startTime.hour > 12 ) {
                                        time = time + " PM"; 
                                    } else {
                                        time = time + " AM";
                                    }
                
                                    let date = buffer.startTime.day + "/" + buffer.startTime.month + "/" + buffer.startTime.year;
                                    let weekday = buffer.startTime.weekday;
                
                                    let disable = 'true';
                                    let minStartDate = parseInt(buffer.startTime.year) * 1000000 +  parseInt(buffer.startTime.month) * 10000 + parseInt(buffer.startTime.day) * 100 + parseInt(buffer.startTime.hour);
                                    // if (order_time < minStartDate) {
                                    //     disable = false;
                                    // }
                
                                    let cell = {
                                        id : i,
                                        confirm_time : time,
                                        confirm_date : date,
                                        confirm_week : weekday,
                                        disable : disable,
                                    }
                                    self.rows.push(cell);
                                }
                                self.rows = self.rows.slice(0,temp.length);
                                
                            let time = String(parseInt(self.localbuffer.product_time.startTime.hour)%12) + ":" + String(self.localbuffer.product_time.startTime.min);
                                if ( self.localbuffer.product_time.startTime.hour > 12 ) {
                                    time = time + " PM"; 
                                } else {
                                    time = time + " AM";
                                }
                
                                let date = self.localbuffer.product_time.startTime.day + "/" + self.localbuffer.product_time.startTime.month + "/" + self.localbuffer.product_time.startTime.year;
                                let weekday = self.localbuffer.product_time.startTime.weekday;
                
                                let disable = 'true';
                
                                if (order_time >= max_forward_time) {
                                    disable = 'false';
                                }
                
                                let cell = {
                                    id : self.allbuffer.length,
                                    confirm_time : time,
                                    confirm_date : date,
                                    confirm_week : weekday,
                                    disable : disable,
                                }
                
                                self.rows.push(cell);
                                self.allbuffer.push(self.localbuffer);
                                self.events.publish("rowsChange",self.rows,self.localbuffer,self.allbuffer);
                                setTimeout(() => {
                                    loader.dismiss();
                                }, 1000);
                        }
                    });
                }    
            } else {
                let time = String(parseInt(self.localbuffer.product_time.startTime.hour)%12) + ":" + String(self.localbuffer.product_time.startTime.min);
                                if ( self.localbuffer.product_time.startTime.hour > 12 ) {
                                    time = time + " PM"; 
                                } else {
                                    time = time + " AM";
                                }
                
                                let date = self.localbuffer.product_time.startTime.day + "/" + self.localbuffer.product_time.startTime.month + "/" + self.localbuffer.product_time.startTime.year;
                                let weekday = self.localbuffer.product_time.startTime.weekday;
                
                                let disable = 'true';
                
                                if (order_time >= max_forward_time) {
                                    disable = 'false';
                                }
                
                                let cell = {
                                    id : self.allbuffer.length,
                                    confirm_time : time,
                                    confirm_date : date,
                                    confirm_week : weekday,
                                    disable : disable,
                                }
                
                                self.rows.push(cell);
                                self.allbuffer.push(self.localbuffer);
                                self.events.publish("rowsChange",self.rows,self.localbuffer,self.allbuffer);
                                setTimeout(() => {
                                    loader.dismiss();
                                }, 1000);
            }
        });
    }
}