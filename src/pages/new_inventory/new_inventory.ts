import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Item, Nav, Platform, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { _DetailPage } from '../';
import { NavProxyService } from '../../services/NavProxy.service';
import {  InventoryPage } from '../inventory/inventory';
import { AngularFirestore ,AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';


import {IMyDpOptions} from 'mydatepicker';


import * as $ from "jquery";
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'new_inventory',
  templateUrl: 'new_inventory.html'
})

export class NewInventoryPage extends _DetailPage {

    public database : any;

    user: Observable<firebase.User>;
    items: Observable<any[]>;

    public config = {
      displayKey:"description", //if objects array passed which key to be displayed defaults to description
      search:false //true/false for the search functionlity
    }

    public myDatePickerOptions: IMyDpOptions = {
      dateFormat: 'dd/mm/yyyy',
    };

    public select_type = 1 ;

    public dataModel : any = [
      "Machinery",
      "Consummable"
    ];

    public aDetails: any
    public bDetails:any

    public imageURI:any;
    public tmpURI:any;
    public imageFileName:any;

    public showAddImage = false;
    public editmode = false;
    public editId :any;
  

   constructor(private transfer: FileTransfer,private camera: Camera,public loadingCtrl: LoadingController,
          public toastCtrl: ToastController,public afAuth: AngularFireAuth,public db: AngularFirestore,
               public navCtrl 	: NavController,  platform: Platform,private http: Http,public navParams: NavParams,
                    public navProxy: NavProxyService, public storage: Storage )
   {

    
    super();
    platform.ready().then(() => {
       
        this.imageURI = "./assets/mark.png"
        
        this.aDetails = [
            {name:"Asset ID",value:"" ,type : "text"},
            {name:"Quantity",value:"" ,type : "text"},
            {name:"Asset Owner",value:"" ,type : "text"},
            {name:"Chassis number",value:"" ,type : "text"},
            {name:"Manufacturer",value:"" ,type : "text"},
            {name:"Length",value:"" ,type : "text"},
            {name:"Breadth",value:"" ,type : "text"},
            {name:"Width",value:"" ,type : "text"},
            {name:"Hours run",value:"",type : "number"},
            {name:"No.of KMS",value:"",type : "number"},
            {name:"Next service",value:"",type : "date"},
            {name:"Insurance renewal date",value:"",type : "date"},
            {name:"Avg,fuel consumption",value:"",type : "number"},
            {name:"RFID no",value:"" ,type : "text"},
            {name:"Center tagged to",value:"",type:"select",data:[{value:"my center"},{value:"center 1"},{value:"center 2"},{value:"center 3"}]},
            {name:"Orders associated with the Asset",value:"",type:"text"},
            {name:"Type of Cooling",value:"",type : "text"},
            {name:"Front tyre Dimension",value:"" ,type : "text" },
            {name:"Read tyre Dimension",value:"" ,type : "text" },
        ];
        this.bDetails = [
            {name:"Type of consummable",value:"" ,type:"text"},
            {name:"Manufacturer",value:"" ,type : "text"},
            {name:"Weight",value:"" ,type : "text"},
            {name:"Quantity",value:"" ,type : "number"},
            {name:"Expiry date",value:"" ,type : "date"},
        ];

      let data = navParams.data;
      if (typeof(data.type) != 'undefined') {
        this.editmode = true;
        this.select_type = data.type;
        this.editId = data.id;
        if (data.type == 1) { //rowB, Tractor
          this.aDetails[0].value =  data.data.asset_id;
          this.aDetails[1].value =  data.data.quantity;
          this.aDetails[2].value =  data.data.assetOwner;
          this.aDetails[3].value =  data.data.chassisNumber;
          this.aDetails[4].value =  data.data.manufacturer;
          this.aDetails[5].value =  data.data.length;
          this.aDetails[6].value =  data.data.breadth;
          this.aDetails[7].value =  data.data.width;
          this.aDetails[8].value =  data.data.hoursRun;
          this.aDetails[9].value =  data.data.numberOfKilometersRun;
          this.aDetails[10].value =  data.data.nextServiceDueon;
          this.aDetails[11].value =  data.data.insuranceRenewalDueon;
          this.aDetails[12].value =  data.data.averageFuelConsumption;
          this.aDetails[13].value =  data.data.RFID_reference;
          this.aDetails[14].value =  data.data.center;
          this.aDetails[15].value =  data.data.ordersAssociatedWithTheAsset;
          this.aDetails[16].value =  data.data.typeOfCooling;
          this.aDetails[17].value =  data.data.frontTyreDimension;
          this.aDetails[18].value =  data.data.readTyreDimension;
          this.imageURI = data.data.image;
        } else { //rowA Seed
          this.bDetails[0].value = data.data.typeOfConsummable;
          this.bDetails[1].value = data.data.manufacturer;
          this.bDetails[2].value = data.data.weight;
          this.bDetails[3].value = data.data.quantity;
          this.bDetails[4].value = data.data.expiryDate;
          this.imageURI = data.data.image;
        }
      }
    });

  }
   nextOrder(event) {
      this.writeStore();  
   }
   ngOnInit() {
    $('.modal-alert').css('display','none');
    var self = this;
    $('.alert-exit-btn').click(function() {
        $('.modal-alert').css('display','none');
        self.navProxy.pushDetail( InventoryPage, null);
    })
    }
    selectionChanged (event) {
      
    }

    writeStore(){

      let loader =  this.loadingCtrl.create({
          content: 'Please wait...'
      });
      loader.present();
      let self = this;
      let sendData : any;
      if (this.select_type == 1) {
        sendData = {
          asset_id :    this.aDetails[0].value,
          quantity :    this.aDetails[1].value,   
          assetOwner :    this.aDetails[2].value,
          chassisNumber :    this.aDetails[3].value,
          manufacturer :    this.aDetails[4].value,
          length :    this.aDetails[5].value,
          breadth :    this.aDetails[6].value,
          width :    this.aDetails[7].value,
          hoursRun :    this.aDetails[8].value,
          numberOfKilometersRun :    this.aDetails[9].value,
          nextServiceDueon :    this.aDetails[10].value,
          insuranceRenewalDueon :    this.aDetails[11].value,
          averageFuelConsumption :    this.aDetails[12].value,
          RFID_reference :    this.aDetails[13].value,
          center :    this.aDetails[14].value,
          ordersAssociatedWithTheAsset :    this.aDetails[15].value,
          typeOfCooling :    this.aDetails[16].value,
          frontTyreDimension :    this.aDetails[17].value,
          readTyreDimension :    this.aDetails[18].value,
          categoryOfInventory : "Machinery",
          expiryDate: "",
          ifLeased: "",
          image : this.imageURI,
          name : "",
          parameter : "",
          price_per_hour : "",
          typeOfInventory : "",
        }

       } else {
          sendData = {
            image : this.imageURI,
            typeOfConsummable : this.bDetails[0].value,
            manufacturer : this.bDetails[1].value,
            weight : this.bDetails[2].value,
            quantity : this.bDetails[3].value,
            expiryDate : this.bDetails[4].value,
            categoryOfInventory : "Consumable"
          }
       }
       if (self.editmode == false) {
          this.db.collection('inventory').add(sendData).then(function(ref) {
            self.navProxy.pushDetail( InventoryPage, null);
            setTimeout(() => {
                loader.dismiss();
            }, 1000);
        });
       } else {
          this.db.collection('inventory').ref.get().then(function(snapshot) {
              if(snapshot.size != 0) {
                console.log(snapshot.docs.keys());
                snapshot.docs.find(item => item.ref.id === self.editId).ref.update(sendData).then(function(ref){
                  self.navProxy.pushDetail( InventoryPage, null);
                  setTimeout(() => {
                      loader.dismiss();
                  }, 1000);
                });
              }
          });
       }
       
    }

    ShowAddImageButton () {
      this.showAddImage = true;
    }

     resizeImage(url, width, height) {
        var sourceImage = new Image();
        let self = this;
        sourceImage.onload = function() {
            // Create a canvas with the desired dimensions
            var canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
    
            // Scale and draw the source image to the canvas
            canvas.getContext("2d").drawImage(sourceImage, 0, 0, width, height);
    
            // Convert the canvas to a data URL in PNG format
            self.imageURI = canvas.toDataURL();
        }
    
        sourceImage.src = url;
    }

    AddImagefromGallery (event) {

      let self = this;
        var options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.PNG,
          mediaType: this.camera.MediaType.PICTURE,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        }
      
        this.camera.getPicture(options).then((imageData) => {
          self.resizeImage('data:image/png;base64,' + imageData,256,256);
        }, (err) => {
          console.log(err);
        });
        this.showAddImage = false;
    }
    AddImagefromCamera(event) {
        let self = this;
        var options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.PNG,
          mediaType: this.camera.MediaType.PICTURE,
        }
      
        this.camera.getPicture(options).then((imageData) => {
          self.resizeImage('data:image/png;base64,' + imageData,256,256);
        }, (err) => {
          console.log(err);
        });
        this.showAddImage = false; 
    }
}