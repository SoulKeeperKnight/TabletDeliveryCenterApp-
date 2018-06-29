import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Item, Nav, Platform, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { _DetailPage } from '../';
import { NavProxyService } from '../../services/NavProxy.service';
import {  ConfirmOrderPage } from '../confirm_orders/confirm_orders';
import {IMyDpOptions} from 'mydatepicker';
import { Events } from 'ionic-angular';

import { AngularFirestore ,AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import * as $ from "jquery";
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'new_orders',
  templateUrl: 'new_orders.html'
})

export class NewOrdersPage extends _DetailPage {

    public database : any;

    public ncount: any;

    public product_name : any;
    public product_date : any;
    public product_hour : any;
    public product_start_time : any;

    public location_distrct : any;
    public location_taluk : any;
    public location_hobli : any;
    public location_village_name : any;

    public customer_name : any;
    public customer_id : any;
    public id: any;

    user: Observable<firebase.User>;
    items: Observable<any[]>;

    public myDatePickerOptions: IMyDpOptions = {
      dateFormat: 'dd/mm/yyyy',
    };

    public weekday: any = {0:"Sun", 1:"Mon", 2:"Tue", 3:"Wed", 4:"Thu", 5:"Fri", 6:"Sat"}

    public model_date: any = { date: { year: 2018, month: 10, day: 9 } };

    public local_newOrderArray : any = {
        product_name : "",
        product_date : "",
        product_hour : "",
        product_start_time : "",
        product_time : "",

        location_distrct : "",
        location_taluk : "",
        location_hobli : "",
        location_village_name : "",

        customer_name : "",
        customer_id : "",
        order_id: "",

        id: "",
    }

    public disableUntil : any = {
      year : "",
      month : "",
      day : "",
    }

    config = {
      displayKey:"name", //if objects array passed which key to be displayed defaults to description
      search:true,
    };

    stringOptions = [
        "Burns Dalton","Mcintyre Lawson","Amie Franklin","Jocelyn Horton","Fischer Erickson", "Medina Underwood","Goldie Barber"
    ]

    DistrictOption = ["No Data"];
    TalukOption = ["No Data"];
    HobliOption = ["No Data"];
    DistrictArray = [];
    TalukArray = [];
    HobliArray = [];

    district_able = 'false' ;
    taluk_able = 'false' ;
    hobli_able = 'false' ;


    singleSelect: any;
   
   constructor(public loadingCtrl: LoadingController, public afAuth: AngularFireAuth,public db: AngularFirestore, public events:Events, public navCtrl 	: NavController,  platform: Platform,private http: Http,public navParams: NavParams,public navProxy: NavProxyService, public storage: Storage )
   {
    super();
    this.database = firebase.database();
    let date = new Date();

    this.product_date = {date: { year: date.getFullYear(),month: date.getMonth() + 1,day: date.getDate()}};
    // this.product_start_time = date.getHours() + ":" + date.getMinutes();
    this.product_start_time = date.getHours() + ":00" ;

    let dateuntil = date.setDate( date.getDate() - 1 );
    this.disableUntil.year = date.getFullYear();
    this.disableUntil.month = date.getMonth();
    this.disableUntil.day = date.getDate();
    let self = this;

    let data = navParams.data;

    if (typeof(data.length) != 'undefined' && data.length != 0)  {
      this.product_name = this.local_newOrderArray.product_name  = data.product_name;
      this.product_date = this.local_newOrderArray.product_date  = data.product_date;
      this.local_newOrderArray.prduct_date_string  = data.prduct_date_string;
      this.product_hour = this.local_newOrderArray.product_hour  = data.product_hour;
      this.product_start_time = this.local_newOrderArray.product_start_time  = data.product_start_time;

       this.local_newOrderArray.location_distrct  = data.location_distrct;
      this.local_newOrderArray.location_taluk  = data.location_taluk;
       this.local_newOrderArray.location_hobli  = data.location_hobli;
      this.local_newOrderArray.location_village_name  = data.location_village_name;
      
      this.customer_name = this.local_newOrderArray.customer_name  = data.customer_name;
      this.customer_id = this.local_newOrderArray.customer_id  = data.customer_id;
      this.id = this.local_newOrderArray.id  = data.id;
    }

          
  }
   nextOrder(event) {
    this.writeNewOrder();
   }

   changeDistrictValue(event,type) {
    $('background').click();
    if (type == 'district') {
        this.taluk_able = 'false';
        this.hobli_able = 'false';
      if (event.value.length != 0) {
        let loader =  this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loader.present();
        if (this.DistrictArray.length != 0) {
          var tempDis = this.DistrictArray.filter(function(d) {
              return d.name == event.value[0];
          });
          if (this.TalukArray.length != 0) {
            var temp = this.TalukArray.filter(function(d) {
                return d.district == tempDis[0].id;
            });
            if (temp.length != 0) {
              this.TalukOption = [];
              this.location_taluk = [];
              for (let i = 0; i < temp.length; i++) {
                this.TalukOption.push(temp[i].name);
                if (i + 1 == temp.length) {
                    setTimeout(() => {
                        loader.dismiss();
                        this.taluk_able = 'true';
                    }, 1000);
                }
              } 
            } else {
              setTimeout(() => {
                  loader.dismiss();
              }, 1000);
            }
          } else {
              setTimeout(() => {
                  loader.dismiss();
              }, 1000);
          }
        } else {
            setTimeout(() => {
                loader.dismiss();
            }, 1000);
        }
        
      }
      // location_distrct
    } else if (type == 'taluk') {
      this.hobli_able = 'false';
      if (event.value.length != 0) {
        // this.taluk_able = 'false';
        let loader =  this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loader.present();
        if (this.TalukArray.length != 0) {
          var tempTalu = this.TalukArray.filter(function(d) {
              return d.name == event.value[0];
          });
          if (this.HobliArray.length != 0) {
            var temp = this.HobliArray.filter(function(d) {
                return d.taluk == tempTalu[0].id;
            });
            if (temp.length != 0) {
              this.location_hobli = [];
              this.HobliOption = [];
              for (let i = 0; i < temp.length; i++) {
                this.HobliOption.push(temp[i].name);
                if (i + 1 == temp.length) {
                  this.hobli_able = 'true';
                  setTimeout(() => {
                      loader.dismiss();
                      this.hobli_able = 'true';
                  }, 1000);
                }
              } 
            } else {
              setTimeout(() => {
                  loader.dismiss();
              }, 1000);
            }
          } else {
            setTimeout(() => {
                loader.dismiss();
            }, 1000);
          }
        } else {
          setTimeout(() => {
              loader.dismiss();
          }, 1000);
        }
      }
      // location_taluk
    } else if (type == 'hobli') {
      // location_hobli
    }
   }
   ngOnInit() {
      this.getLocationData();
    }

    getLocationData () {
      let loader =  this.loadingCtrl.create({
          content: 'Please wait...'
      });
      loader.present();
    
      let self = this;
      self.afAuth.auth.signInAnonymously();
      self.user = self.afAuth.authState;
      self.db.collection('district/').ref.get().then(function(snapshot) {
          let length = snapshot.size;
          self.DistrictOption = [];
          for (let i = 0; i < snapshot.docs.length; i++) {
            snapshot.docs[i].ref.get().then(function(docshot){
              docshot.data();
              let celldata = {
                id:docshot.ref.id,
                name: docshot.data()['name'],
              }
              self.DistrictArray.push(celldata);
              self.DistrictOption.push(celldata.name);
              if ( i + 1 == snapshot.docs.length) {
                self.district_able = 'true';
              }
            });
          }
      });
      self.db.collection('taluk/').ref.get().then(function(snapshot) {
          let length = snapshot.size;
          self.TalukOption = [];
          for (let i = 0; i < snapshot.docs.length; i++) {
            snapshot.docs[i].ref.get().then(function(docshot){
              let district = docshot.data()['district'];
              if (district.length != null) {
                let temp = String(district).split('/');
                if (temp.length != 0){
                  district = temp[temp.length-1];
                } else {
                  district = "";
                }
              }
              let celldata = {
                id:docshot.ref.id,
                name: docshot.data()['name'],
                district: district,
              }
              self.TalukArray.push(celldata);
              self.TalukOption.push(celldata.name);
              if ( i + 1 == snapshot.docs.length) {
                // self.taluk_able = 'true';
              }
            });
          }
      });

      self.db.collection('hobli/').ref.get().then(function(snapshot) {
          let length = snapshot.size;
          self.HobliOption = [];
          for (let i = 0; i < snapshot.docs.length; i++) {
            snapshot.docs[i].ref.get().then(function(docshot){
              let taluk = docshot.data()['taluk'];
              if (taluk.length != 0) {
                let temp = String(taluk).split('/');
                if (temp.length != 0){
                  taluk = temp[temp.length-1];
                } else {
                  taluk = "";
                }
              }
              let celldata = {
                id:docshot.ref.id,
                name: docshot.data()['name'],
                taluk: taluk,
              }
              self.HobliArray.push(celldata);
              self.HobliOption.push(celldata.name);
              if ( i + 1 == snapshot.docs.length) {
                // self.hobli_able = 'true';
                setTimeout(() => {
                    loader.dismiss();
                }, 1000);
              }
            });
          }
      });
  }
    writeNewOrder () {

      if (
          typeof(this.product_name) == 'undefined' ||
          typeof(this.product_date) == 'undefined' ||
          typeof(this.product_hour) == 'undefined' ||
          typeof(this.product_start_time) == 'undefined' ||
          typeof(this.location_distrct) == 'undefined' ||
          typeof(this.location_taluk) == 'undefined' ||
          typeof(this.location_hobli) == 'undefined' ||
          typeof(this.location_village_name) == 'undefined' ||
          typeof(this.customer_name) == 'undefined' ||
          typeof(this.customer_id) == 'undefined' ||
          this.product_name == "" ||
          this.product_date == "" ||
          this.product_hour == "" ||
          this.product_start_time == "" ||
          this.location_distrct == "" ||
          this.location_taluk == "" ||
          this.location_hobli == "" ||
          this.location_village_name == "" ||

          this.customer_name == "" ||
          this.customer_id == "" 
        ) {
          debugger;
          alert ("Please write all data");
          return;
        } else {
          var self = this;

          this.local_newOrderArray.product_name  = this.product_name;
          this.local_newOrderArray.product_date  = this.product_date;
          this.local_newOrderArray.prduct_date_string  = self.product_date.date.day + '/' + self.product_date.date.month + '/' + self.product_date.date.year;
          this.local_newOrderArray.product_hour  = this.product_hour;
          this.local_newOrderArray.product_start_time  = this.product_start_time;

          this.local_newOrderArray.location_distrct  = this.location_distrct;
          this.local_newOrderArray.location_taluk  = this.location_taluk;
          this.local_newOrderArray.location_hobli  = this.location_hobli;
          this.local_newOrderArray.location_village_name  = this.location_village_name;
          
          this.local_newOrderArray.customer_name  = this.customer_name;
          this.local_newOrderArray.customer_id  = this.customer_id;
          this.local_newOrderArray.id  = this.id;

          let hour = String(this.product_start_time).split(":")[0];
          let min = String(this.product_start_time).split(":")[1];
          min = "00";

          let forwardDate = new Date();
          let forward = forwardDate.setFullYear(this.product_date.date.year,this.product_date.date.month-1,this.product_date.date.day);
          forwardDate.setHours( parseInt(hour) + parseInt(this.product_hour) + 1 ,parseInt(min));
          if ( ( parseInt(hour) + parseInt(this.product_hour) + 1 ) > 24) {
            let addTime = ( parseInt(hour) + parseInt(this.product_hour) + 1 ) - 24;
            let addDay = Math.floor(addTime/24);
            forwardDate.setDate( forwardDate.getDate() + addDay );
          }

          let endDate = new Date();
          let end = endDate.setFullYear(this.product_date.date.year,this.product_date.date.month-1,this.product_date.date.day);
          endDate.setHours( parseInt(hour) + parseInt(this.product_hour) ,parseInt(min));
          if ( ( parseInt(hour) + parseInt(this.product_hour) ) > 24) {
            let addTime = ( parseInt(hour) + parseInt(this.product_hour) ) - 24;
            let addDay = Math.floor(addTime/24);
            endDate.setDate( endDate.getDate() + addDay );
          }
 

          let tempDate = new Date();
          tempDate.setFullYear(this.product_date.date.year,this.product_date.date.month - 1,this.product_date.date.day);
          let start_weekday = tempDate.getDay();
          let startTime : any = {
            year: this.product_date.date.year,
            month: this.product_date.date.month,
            day: this.product_date.date.day,
            hour: hour,
            min: min, 
            weekday : this.weekday[start_weekday],
          }

          let endTime : any = {
            year: endDate.getFullYear(),
            month: endDate.getMonth() + 1,
            day: endDate.getDate(),
            hour: endDate.getHours(),
            min: endDate.getMinutes(),
            weekday: this.weekday[endDate.getDay()]
          }

          let forwardTime : any = {
            year: forwardDate.getFullYear(),
            month: forwardDate.getMonth() + 1,
            day: forwardDate.getDate(),
            hour: forwardDate.getHours(),
            min: forwardDate.getMinutes(),
            weekday: this.weekday[forwardDate.getDay()]
          }
          let time : any = {
            startTime : startTime,
            endTime : endTime,
            forwardTime : forwardTime
          }
          this.local_newOrderArray.product_time = time;

          this.storage.set('local_newOrder',this.local_newOrderArray);

          // this.events.publish("local_newOrder",this.local_newOrderArray);

          self.navProxy.pushDetail( ConfirmOrderPage, this.local_newOrderArray);

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
    }

}