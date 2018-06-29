import { Component, Injectable,  } from '@angular/core';
import { IonicPage, NavController, NavParams, Item, LoadingController } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { _DetailPage } from '../';
import { TrackInventoryPage} from '../track_inventory/track_inventory';
import { NewInventoryPage} from '../new_inventory/new_inventory';
import { NavProxyService } from '../../services/NavProxy.service';

import { AngularFirestore ,AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { Events } from 'ionic-angular';



import * as $ from "jquery";
import * as firebase from 'firebase/app';

export interface Config {
	technologies: string;
}
@Injectable()
@IonicPage()
@Component({
  selector: 'inventory',
  templateUrl: 'inventory.html'
})
export class InventoryPage extends _DetailPage {

   public config : Config;

   public columnsA : any;
   public columnsB : any;

   public ShowTabs: boolean = true;

   public rowsA = [];
   public rowsB = [];
   public rowsAIndex = [];
   public rowsBIndex = [];

   public item:any;

   public sort_value: any;
   public sort_num:any;

   user: Observable<firebase.User>;
  items: Observable<any[]>;

  public delete_start: any;

   constructor( public loadingCtrl: LoadingController, public events:Events, public afAuth: AngularFireAuth,public db: AngularFirestore, public navCtrl 	: NavController, public navParams: NavParams, public navProxy:NavProxyService)
   {
    super();
    this.item = navParams.data;
    // this.storage.get('detail').then((val) => {
    //   debugger;
    // });
    // this.getJSON().subscribe(data => this.rows=data.technologies, error => console.log(error));
      // Define the columns for the data table
      // (based off the names of the keys in the JSON file)
      this.columnsA = [
        { prop: 'image' },
        { prop: 'manufacturer' },
        { prop: 'quantity' },
        { prop: 'activate_in_app' },
        { prop: 'Details' },
        { prop: 'Special Action' }
      ];
      this.columnsB = [
        { prop: 'image' },
        { prop: 'inventory_snapshot' },
        { prop: 'manufacturer' },
        { prop: 'assetOwner' },
        { prop: 'Details' },
        { prop: 'Special Action' },
      ];
      this.getFormStore();
   }

   nextOrder() {
    this.navProxy.pushDetail( NewInventoryPage, null);
    // this.navProxy.pushDetail( TrackInventoryPage, null);
   }

   ngOnInit() {
        var self = this;
        $( ".table-add-btn" ).click(function() {
            self.nextOrder();
        });
        $('.table-title').click(function() {
          self.navProxy.pushDetail(InventoryPage, null);
        });

      this.events.subscribe('deleteRow_confirm', (delete_flag,delete_index) => {
        if (self.delete_start != true) {
          self.delete_start = true;
          let delete_id :any;
          if (delete_flag == true) {
            self.rowsA.splice(delete_index, 1);
            delete_id = self.rowsAIndex[delete_index];
            self.rowsAIndex.splice(delete_index, 1);
            self.rowsA = [...self.rowsA];
          } else {
            self.rowsB.splice(delete_index, 1);
            delete_id = self.rowsBIndex[delete_index];
            self.rowsBIndex.splice(delete_index, 1);
            self.rowsB = [...self.rowsB];
          }
          let loader =  self.loadingCtrl.create({
              content: 'Please wait...'
          });
          loader.present();
          self.db.collection('inventory').ref.get().then(function(snapshot) {
              if(snapshot.size != 0) {
                console.log(snapshot.docs.keys());
                snapshot.docs.find(item => item.ref.id === delete_id).ref.delete().then(function(ref){
                  setTimeout(() => {
                    self.delete_start = false;
                      loader.dismiss();
                  }, 1000);
                });
              } else {
                setTimeout(() => {
                  self.delete_start = false;
                    loader.dismiss();
                }, 1000);
              }
          });
        }
      });
    }
    onActiveInApp (event) {
      console.log(event);
    }

  //  public getJSON(): Observable<any> {
  //   return this.http.get("./assets/data/inventory.json")
  //                   .map((res:any) => res.json());

  //   } 
  onSpecialAction (row, action, index,flag) {
    console.log(row);
    console.log(action);
    console.log(index);
    if (action == "delete") {
      if (index > -1) {
        if (flag == 'false') {
          this.events.publish('delete_rowB',this.rowsB[index].inventory_snapshot,index);
        } else {
          this.events.publish('delete_rowA',this.rowsA[index].manufacturer,index);
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
        let data = {
          id : this.rowsBIndex[index],
          data: this.rowsB[index],
          type: 1,
        }
          this.navProxy.pushDetail(NewInventoryPage, data);
        } else {
          //seed rowA
          let data = {
            id : this.rowsAIndex[index],
            data: this.rowsA[index],
            type: 2,
          }
            this.navProxy.pushDetail(NewInventoryPage, data);
        }
      }
    }
  }
  onShowDetails(row,rowIndex) {
    let item = this.rowsB[rowIndex];
    this.events.publish('details',item);
  }

  openTabs(event, str) {
    if (str == 'Tractor') {
      this.ShowTabs = true;
    } else {
      this.ShowTabs = false;
    }

  }

  refreshAll ( all, current) {
    if (all - 1 == current) {
      this.rowsB = [...this.rowsB];
      this.rowsA = [...this.rowsA];
    }
  }

  tabClick () {
    console.log("tab clicked");
    this.rowsB = [...this.rowsB];
    this.rowsA = [...this.rowsA];
  }

  getFormStore () {
    this.afAuth.auth.signInAnonymously();
    this.user = this.afAuth.authState;
    let self = this;
    let loader =  this.loadingCtrl.create({
        content: 'Please wait...'
    });
    loader.present();
    this.db.collection('inventory').ref.get().then(function(snapshot) {

        if(snapshot.size != 0) {

          for (let i = 0; i < snapshot.size; i++) {
            snapshot.docs[i].ref.get().then(function(docshot) {
    
              let row_array = docshot.data();
              if (row_array.categoryOfInventory == "Machinery") {
                // rowB
                self.rowsB.push(row_array);
                self.rowsBIndex.push(docshot.ref.id);
              } else {
                self.rowsAIndex.push(docshot.ref.id);
                self.rowsA.push(row_array);
              }
              self.refreshAll(snapshot.size, i);
              if (snapshot.size - 1 == i) {
                setTimeout(() => {
                    loader.dismiss();
                }, 1000);
              }
            });
          }
        }
    });
  }
  
}