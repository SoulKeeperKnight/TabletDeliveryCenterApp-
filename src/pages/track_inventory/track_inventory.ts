import { Component,  } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { _DetailPage } from '../';
import { InventoryPage} from '../inventory/inventory';
import { NavProxyService } from '../../services/NavProxy.service';
import * as $ from "jquery";

export interface Config {
	technologies: string;
}

@IonicPage()
@Component({
  selector: 'track_inventory',
  templateUrl: 'track_inventory.html'
})
export class TrackInventoryPage extends _DetailPage {

   /**
    * @name config
    * @type {any}
    * @public
    * @description     Defines an object allowing the interface properties to be accessed
    */
   public config : Config;

    
   /**
    * @name columns
    * @type {any}
    * @public
    * @description     Defines an object for storing the column definitions of the datatable
    */
   public columns : any;



   /**
    * @name rows
    * @type {any}
    * @public
    * @description     Defines an object for storing returned data to be displayed in the template
    */
   public rows : any;

   public item:any;

   public sort_value: any;
   public sort_num:any;


   constructor(public navCtrl 	: NavController, private http: Http,public navParams: NavParams, public navProxy:NavProxyService)
   {
    super();
    this.item = navParams.data;
    this.getJSON().subscribe(data => this.rows=data.technologies, error => console.log(error));
      // Define the columns for the data table
      // (based off the names of the keys in the JSON file)
    this.columns = [
        { prop: 'item_image' },
        { prop: 'inventory_snapshot' },
        { prop: 'make_model' },
        { prop: 'owner' },
        { prop: 'Details' },
        { prop: 'Special Action' },
      ];
   }

   ngOnInit() {
        var self = this;
        $('.table-title').click(function() {
            self.navProxy.pushDetail(InventoryPage, null);
        });
    }

   public getJSON(): Observable<any> {
    return this.http.get("./assets/data/inventory.json")
                    .map((res:any) => res.json());

  }
  onSpecialAction (row, action, index) {
    console.log(row);
    console.log(action);
    console.log(index);
    if (action == "delete") {
      if (index > -1) {
        this.rows.splice(index, 1);
        this.rows = [...this.rows];
      }
    }
  }
  onShowDetails(row,rowIndex) {
      $('.track-detail').css('display','block');
  }
  
}