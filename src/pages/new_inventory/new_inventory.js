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
import { IonicPage, NavController, NavParams, Platform, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { _DetailPage } from '../';
import { NavProxyService } from '../../services/NavProxy.service';
import { InventoryPage } from '../inventory/inventory';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';
import * as $ from "jquery";
var NewInventoryPage = /** @class */ (function (_super) {
    __extends(NewInventoryPage, _super);
    function NewInventoryPage(transfer, camera, loadingCtrl, toastCtrl, afAuth, db, navCtrl, platform, http, navParams, navProxy, storage) {
        var _this = _super.call(this) || this;
        _this.transfer = transfer;
        _this.camera = camera;
        _this.loadingCtrl = loadingCtrl;
        _this.toastCtrl = toastCtrl;
        _this.afAuth = afAuth;
        _this.db = db;
        _this.navCtrl = navCtrl;
        _this.http = http;
        _this.navParams = navParams;
        _this.navProxy = navProxy;
        _this.storage = storage;
        _this.config = {
            displayKey: "description",
            search: false //true/false for the search functionlity
        };
        _this.myDatePickerOptions = {
            dateFormat: 'dd/mm/yyyy',
        };
        _this.select_type = 1;
        _this.dataModel = [
            "Machinery",
            "Consummable"
        ];
        _this.showAddImage = false;
        _this.editmode = false;
        platform.ready().then(function () {
            _this.imageURI = "./assets/mark.png";
            _this.aDetails = [
                { name: "Asset ID", value: "", type: "text" },
                { name: "Quantity", value: "", type: "text" },
                { name: "Asset Owner", value: "", type: "text" },
                { name: "Chassis number", value: "", type: "text" },
                { name: "Manufacturer", value: "", type: "text" },
                { name: "Length", value: "", type: "text" },
                { name: "Breadth", value: "", type: "text" },
                { name: "Width", value: "", type: "text" },
                { name: "Hours run", value: "", type: "number" },
                { name: "No.of KMS", value: "", type: "number" },
                { name: "Next service", value: "", type: "date" },
                { name: "Insurance renewal date", value: "", type: "date" },
                { name: "Avg,fuel consumption", value: "", type: "number" },
                { name: "RFID no", value: "", type: "text" },
                { name: "Center tagged to", value: "", type: "select", data: [{ value: "my center" }, { value: "center 1" }, { value: "center 2" }, { value: "center 3" }] },
                { name: "Orders associated with the Asset", value: "", type: "text" },
                { name: "Type of Cooling", value: "", type: "text" },
                { name: "Front tyre Dimension", value: "", type: "text" },
                { name: "Read tyre Dimension", value: "", type: "text" },
            ];
            _this.bDetails = [
                { name: "Type of consummable", value: "", type: "text" },
                { name: "Manufacturer", value: "", type: "text" },
                { name: "Weight", value: "", type: "text" },
                { name: "Quantity", value: "", type: "number" },
                { name: "Expiry date", value: "", type: "date" },
            ];
            var data = navParams.data;
            if (typeof (data.type) != 'undefined') {
                _this.editmode = true;
                _this.select_type = data.type;
                _this.editId = data.id;
                if (data.type == 1) { //rowB, Tractor
                    _this.aDetails[0].value = data.data.asset_id;
                    _this.aDetails[1].value = data.data.quantity;
                    _this.aDetails[2].value = data.data.assetOwner;
                    _this.aDetails[3].value = data.data.chassisNumber;
                    _this.aDetails[4].value = data.data.manufacturer;
                    _this.aDetails[5].value = data.data.length;
                    _this.aDetails[6].value = data.data.breadth;
                    _this.aDetails[7].value = data.data.width;
                    _this.aDetails[8].value = data.data.hoursRun;
                    _this.aDetails[9].value = data.data.numberOfKilometersRun;
                    _this.aDetails[10].value = data.data.nextServiceDueon;
                    _this.aDetails[11].value = data.data.insuranceRenewalDueon;
                    _this.aDetails[12].value = data.data.averageFuelConsumption;
                    _this.aDetails[13].value = data.data.RFID_reference;
                    _this.aDetails[14].value = data.data.center;
                    _this.aDetails[15].value = data.data.ordersAssociatedWithTheAsset;
                    _this.aDetails[16].value = data.data.typeOfCooling;
                    _this.aDetails[17].value = data.data.frontTyreDimension;
                    _this.aDetails[18].value = data.data.readTyreDimension;
                    _this.imageURI = data.data.image;
                }
                else { //rowA Seed
                    _this.bDetails[0].value = data.data.typeOfConsummable;
                    _this.bDetails[1].value = data.data.manufacturer;
                    _this.bDetails[2].value = data.data.weight;
                    _this.bDetails[3].value = data.data.quantity;
                    _this.bDetails[4].value = data.data.expiryDate;
                    _this.imageURI = data.data.image;
                }
            }
        });
        return _this;
    }
    NewInventoryPage.prototype.nextOrder = function (event) {
        this.writeStore();
    };
    NewInventoryPage.prototype.ngOnInit = function () {
        $('.modal-alert').css('display', 'none');
        var self = this;
        $('.alert-exit-btn').click(function () {
            $('.modal-alert').css('display', 'none');
            self.navProxy.pushDetail(InventoryPage, null);
        });
    };
    NewInventoryPage.prototype.selectionChanged = function (event) {
    };
    NewInventoryPage.prototype.writeStore = function () {
        var loader = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loader.present();
        var self = this;
        var sendData;
        if (this.select_type == 1) {
            sendData = {
                asset_id: this.aDetails[0].value,
                quantity: this.aDetails[1].value,
                assetOwner: this.aDetails[2].value,
                chassisNumber: this.aDetails[3].value,
                manufacturer: this.aDetails[4].value,
                length: this.aDetails[5].value,
                breadth: this.aDetails[6].value,
                width: this.aDetails[7].value,
                hoursRun: this.aDetails[8].value,
                numberOfKilometersRun: this.aDetails[9].value,
                nextServiceDueon: this.aDetails[10].value,
                insuranceRenewalDueon: this.aDetails[11].value,
                averageFuelConsumption: this.aDetails[12].value,
                RFID_reference: this.aDetails[13].value,
                center: this.aDetails[14].value,
                ordersAssociatedWithTheAsset: this.aDetails[15].value,
                typeOfCooling: this.aDetails[16].value,
                frontTyreDimension: this.aDetails[17].value,
                readTyreDimension: this.aDetails[18].value,
                categoryOfInventory: "Machinery",
                expiryDate: "",
                ifLeased: "",
                image: this.imageURI,
                name: "",
                parameter: "",
                price_per_hour: "",
                typeOfInventory: "",
            };
        }
        else {
            sendData = {
                image: this.imageURI,
                typeOfConsummable: this.bDetails[0].value,
                manufacturer: this.bDetails[1].value,
                weight: this.bDetails[2].value,
                quantity: this.bDetails[3].value,
                expiryDate: this.bDetails[4].value,
                categoryOfInventory: "Consumable"
            };
        }
        if (self.editmode == false) {
            this.db.collection('inventory').add(sendData).then(function (ref) {
                self.navProxy.pushDetail(InventoryPage, null);
                setTimeout(function () {
                    loader.dismiss();
                }, 1000);
            });
        }
        else {
            this.db.collection('inventory').ref.get().then(function (snapshot) {
                if (snapshot.size != 0) {
                    console.log(snapshot.docs.keys());
                    snapshot.docs.find(function (item) { return item.ref.id === self.editId; }).ref.update(sendData).then(function (ref) {
                        self.navProxy.pushDetail(InventoryPage, null);
                        setTimeout(function () {
                            loader.dismiss();
                        }, 1000);
                    });
                }
            });
        }
    };
    NewInventoryPage.prototype.ShowAddImageButton = function () {
        this.showAddImage = true;
    };
    NewInventoryPage.prototype.resizeImage = function (url, width, height) {
        var sourceImage = new Image();
        var self = this;
        sourceImage.onload = function () {
            // Create a canvas with the desired dimensions
            var canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            // Scale and draw the source image to the canvas
            canvas.getContext("2d").drawImage(sourceImage, 0, 0, width, height);
            // Convert the canvas to a data URL in PNG format
            self.imageURI = canvas.toDataURL();
        };
        sourceImage.src = url;
    };
    NewInventoryPage.prototype.AddImagefromGallery = function (event) {
        var self = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.camera.getPicture(options).then(function (imageData) {
            self.resizeImage('data:image/png;base64,' + imageData, 256, 256);
        }, function (err) {
            console.log(err);
        });
        this.showAddImage = false;
    };
    NewInventoryPage.prototype.AddImagefromCamera = function (event) {
        var self = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE,
        };
        this.camera.getPicture(options).then(function (imageData) {
            self.resizeImage('data:image/png;base64,' + imageData, 256, 256);
        }, function (err) {
            console.log(err);
        });
        this.showAddImage = false;
    };
    NewInventoryPage = __decorate([
        IonicPage(),
        Component({
            selector: 'new_inventory',
            templateUrl: 'new_inventory.html'
        }),
        __metadata("design:paramtypes", [FileTransfer, Camera, LoadingController,
            ToastController, AngularFireAuth, AngularFirestore,
            NavController, Platform, Http, NavParams,
            NavProxyService, Storage])
    ], NewInventoryPage);
    return NewInventoryPage;
}(_DetailPage));
export { NewInventoryPage };
//# sourceMappingURL=new_inventory.js.map