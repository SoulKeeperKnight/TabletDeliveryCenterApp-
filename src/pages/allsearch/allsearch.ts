import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Item, LoadingController } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { _DetailPage } from '../';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatatableComponent } from '@swimlane/ngx-datatable/release/components/datatable.component';
import {Page, PagedData} from "../../provider/model"
import * as $ from "jquery";
import * as firebase from 'firebase/app';

import { AngularFirestore ,AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Events } from 'ionic-angular';
import { NavProxyService } from '../../services/NavProxy.service';
import { NewOrdersPage } from '../../pages/new_orders/new_orders'
 
export interface Config {
	technologies: string;
}



@IonicPage()
@Component({
  selector: 'allsearch',
  templateUrl: 'allsearch.html'
})


export class AllSearchPage extends _DetailPage {
    
    public page = new Page();

    public rows : any[] = [];
    public rows_customer : any[] = [];
    public rows_driver : any[] = [];
    public temp_rows : any[] = [];

    public config : Config;

    public columns : any;
    public columnsCustomer : any;
    public columnsDriver : any;

    public item:any;

    public sort_value: any;
    public sort_num:any;
    public temp:any;
    selected: any[] = [];
    public page_size = 10;
    public loading: boolean = false;
    public search_order: any;

    user: Observable<firebase.User>;
    items: Observable<any[]>;

    

    @ViewChild('table') table: DatatableComponent;

    delete_start : any;

    public showOrder :any;
    public showCustomer :any;
    public showDriver :any;

    public searchFlag: any;
    public searchSection: any;

    public searchTitle : any;

   constructor(public navProxy:NavProxyService, public loadingCtrl: LoadingController, public events:Events, public afAuth: AngularFireAuth,public db: AngularFirestore,public navCtrl 	: NavController, private http: Http,public navParams: NavParams)
   {
    super();
    this.showDriver = 'false';
    this.showCustomer = 'false';
    this.showOrder = 'false';
    this.searchFlag = navParams.data;
    this.searchTitle = "Search By " + this.searchFlag;
    if (this.searchFlag == 'Telephone') {
        this.showDriver = 'true';
        this.showCustomer = 'true';
    } else if (this.searchFlag == 'Village') {
        this.showDriver = 'true';
        this.showCustomer = 'true';
        this.showOrder = 'true';
    } else if (this.searchFlag == 'Taluk') {
        this.showDriver = 'true';
        this.showCustomer = 'true';
        this.showOrder = 'true';
    } else if (this.searchFlag == 'Hobli') {
        this.showDriver = 'true';
        this.showCustomer = 'true';
        this.showOrder = 'true';
    } else if (this.searchFlag == 'Voter') {

    } else if (this.searchFlag == 'Aadhar') {

    } else if (this.searchFlag == 'Ration') {

    }


      this.columns = [
        { prop: 'order_id' },
        { prop: 'prduct_date_string' },
        { prop: 'customer_name' },
        { prop: 'Details' },
        { prop: 'Driver ID' },
        { prop: 'Order Value' },
        { prop: 'Special Action' }
      ];

      this.columnsCustomer = [
        { prop: 'name' },
        { prop: 'birthday' },
        { prop: 'mobile' },
        { prop: 'location' },
        { prop: 'pincode' },
        { prop: 'kyc_type' },
        { prop: 'Special Action' }
      ];

      this.columnsDriver = [
        { prop: 'name' },
        { prop: 'birthday' },
        { prop: 'mobile' },
        { prop: 'location' },
        { prop: 'pincode' },
        { prop: 'kyc_type' },
        { prop: 'Special Action' }
      ];

      let self = this;
      events.subscribe('showAllOrders', (rows) => {
        self.rows = new Array();
        self.rows = rows;
        self.temp_rows = new Array();
        self.temp_rows = [...self.rows];
      });
      this.getAllOrders();
    //   this.getJSON().subscribe(data => {
    //             this.rows=data.technologies;
    //             this.temp_rows = [...this.rows];
    //         }, error => console.log(error));
   }

   
   onSort(event) {
    // event was triggered, start sort sequence
    console.log('Sort Event', event);
    this.loading = true;
    // emulate a server request with a timeout
    setTimeout(() => {
      const rows = [...this.rows];
      // this is only for demo purposes, normally
      // your server would return the result for
      // you and you would just set the rows prop
      const sort = event[0];
       ;
      rows.sort((a, b) => {
        return a[sort.prop].localeCompare(b[sort.prop]) * (sort.dir === 'desc' ? -1 : 1);
      });

      this.rows = rows;
      this.loading = false;
    }, 1000);
  }

   setPage(pageInfo){
    this.page.pageNumber = pageInfo.offset;
    this.getJSON().subscribe(data => {
         ;
        this.rows=data.technologies;
        this.page.size = this.page_size;
        this.page.totalElements = this.rows.length;
        this.page.totalPages = Math.floor(this.rows.length/this.page.size) + 1;
        let start = this.page.pageNumber * this.page_size;
        let end = Math.min((start + this.page_size), this.rows.length);
        var buffer = new Array(); 
        for (let i = start; i < end; i++){
            buffer.push(this.rows[i]);
        }
        this.rows = buffer;
        this.rows = [...this.rows];
    }, error => console.log(error));
    console.log("page set");
    }

   ngOnInit() {
        var self = this;
        $( ".table-search-btn" ).click(function() {
            $('.model-view').css('display','block');
        });
        $('#search-value-1').click(function() {
            $('#search-value').html("By Date");
            self.sort_num = 1;
        });
        $('#search-value-2').click(function() {
            $('#search-value').html("By Customer name");
            self.sort_num = 2;
        });
        $('#search-value-3').click(function() {
            $('#search-value').html("By Driver name");
            self.sort_num = 3;
        });
        $('#search-value-4').click(function() {
            $('#search-value').html("By Order no");
            self.sort_num = 4;
        });
        $('#search-start').click(function() {
            self.sortTable();
            $('.model-view').css('display','none');
        });
        this.sort_value = [{ prop: 'order_id', dir: 'asc' }];
        // this.setPage({ offset: 0 });
        // let event = [{ prop: 'order_id', dir: 'asc' }];
        // this.onSort(event);

        this.events.subscribe('deleteOrder_confirm', (delete_flag,delete_index) => {
            if (self.delete_start != true) {
              self.delete_start = true;
              let delete_id :any;

                
                if ( typeof(self.temp_rows) != 'undefined' && typeof(self.temp_rows[delete_index]) != 'undefined' && typeof(self.temp_rows[delete_index].id) != 'undefined') {
                    delete_id = self.temp_rows[delete_index].id;
                    self.temp_rows.splice(delete_index, 1);
                        self.temp_rows = [...self.temp_rows];
                        self.rows = new Array();
                        self.rows = self.temp_rows;
                        self.events.publish('showAllOrders',self.temp_rows);
                        let loader =  self.loadingCtrl.create({
                            content: 'Please wait...'
                        });
                    loader.present();

                    self.db.collection('orders').ref.get().then(function(snapshot) {
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
                
            }
          });

    }

   public getJSON(): Observable<any> {
    return this.http.get("./assets/data/techologies.json")
                    .map((res:any) => res.json());

  }
  public sortTable() {
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
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    if (this.searchSection == 'Orders') {
        var temp = new Array();
        if (this.searchFlag == 'Village') {
            temp = this.temp_rows.filter(function(d) {
                return (d["location_village_name"][0].toLowerCase().indexOf(val) !== -1 || !val);
            });
        } else if (this.searchFlag == 'Taluk') {
            temp = this.temp_rows.filter(function(d) {
                return (d["location_taluk"][0].toLowerCase().indexOf(val) !== -1 || !val);
            });    
        } else if (this.searchFlag == 'Hobli') {
            temp = this.temp_rows.filter(function(d) {
                return (d["location_hobli"][0].toLowerCase().indexOf(val) !== -1 || !val);
            });
        }
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }
  }

  onSpecialAction(row,action,rowIndex) {
      if (action == 'delete') {
            this.events.publish('order_delete',row.order_id,rowIndex);
      } else {
        if (rowIndex > -1) {
              this.navProxy.pushDetail(NewOrdersPage, this.rows[rowIndex]);
          }
      }
  }

  onShowDetails(row,rowIndex) {
    let item = this.rows[rowIndex];
    this.events.publish('order_details',item);
  }

  tabClick (flag) {

        this.searchSection = flag;
        this.searchTitle = "Search By " + this.searchFlag + " In " + flag;
        if (flag == 'Orders') {

        } else if (flag == 'Customers') {

        } else if (flag == 'Drivers') {

        }
    console.log("tab clicked");
  }

  getAllOrders() {
    var self = this;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    
    let loader =  this.loadingCtrl.create({
        content: 'Please wait...'
    });
    loader.present();
    
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

    this.afAuth.auth.signInAnonymously();
    this.user = this.afAuth.authState;
    this.db.collection('orders').ref.get().then(function(snapshot) {

        if(snapshot.size != 0) {
          for (let i = 0; i < snapshot.size; i++) {
            snapshot.docs[i].ref.get().then(function(docshot) {  
              let row_array = docshot.data();
              row_array.id = new String();
              row_array.id = docshot.id;
              self.rows.push(row_array);
                if (i + 1 == snapshot.size) {
                    self.temp_rows = self.rows; 
                    self.rows = [...self.rows]; 
                    self.temp_rows = [...self.temp_rows]; 
                    self.events.publish('showAllOrders',self.rows);
                    setTimeout(() => {
                        loader.dismiss();
                    }, 1000);
                }
            });
          }
        } else {
            setTimeout(() => {
                loader.dismiss();
            }, 1000);
        }
    });



  }
}