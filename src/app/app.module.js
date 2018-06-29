var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { NavProxyService } from '../services/NavProxy.service';
import { MyApp } from './app.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
//***********  Angularfire2 v5 **************/
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';
//***********  Facebook **************/
import { Facebook } from '@ionic-native/facebook';
//***********  Google plus **************/
import { GooglePlus } from '@ionic-native/google-plus';
//*********** Provider **************/
import { AuthData } from '../provider/auth-data';
import { WindowRef } from '../provider/WindowRef';
import { MyDatePickerModule } from 'mydatepicker';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { ChartsModule } from 'ng2-charts';
import { ItemsPage, ItemPage, OrdersPage, AllOrdersPage, PlaceholderPage, NewOrdersPage, ConfirmOrderPage, InventoryPage, NewInventoryPage, DashboardPage, AllSearchPage, TrackInventoryPage, DriversPage, } from '../pages';
import { MainPage } from '../pages/auth/main/main';
import { LoginPage } from '../pages/auth/login/login';
import { PhonePage } from '../pages/auth/phone/phone';
import { BackGroundPage } from '../pages/background/background';
import * as firebase from 'firebase';
//********** firebase configuration  ************ */
export var config = {
    apiKey: "AIzaSyBxamkzN_fUoBtaa4CxpIh9TQgc59UUJIA",
    authDomain: "abc4d-32f7d.firebaseapp.com",
    databaseURL: "https://abc4d-32f7d.firebaseio.com",
    projectId: "abc4d-32f7d",
    storageBucket: "abc4d-32f7d.appspot.com",
    messagingSenderId: "118496199824"
};
firebase.initializeApp(config);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                ItemsPage,
                ItemPage,
                OrdersPage,
                AllOrdersPage,
                NewOrdersPage,
                ConfirmOrderPage,
                InventoryPage,
                TrackInventoryPage,
                NewInventoryPage,
                DashboardPage,
                AllSearchPage,
                PlaceholderPage,
                MainPage,
                LoginPage,
                PhonePage,
                BackGroundPage,
                DriversPage,
            ],
            imports: [
                BrowserModule,
                MyDatePickerModule,
                NgxDatatableModule,
                AmazingTimePickerModule,
                SelectDropDownModule,
                ChartsModule,
                HttpModule,
                HttpClientModule,
                AngularFireModule.initializeApp(config),
                AngularFireDatabaseModule,
                AngularFireAuthModule,
                AngularFirestoreModule.enablePersistence(),
                IonicModule.forRoot(MyApp),
                IonicStorageModule.forRoot(),
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                ItemsPage,
                ItemPage,
                OrdersPage,
                AllOrdersPage,
                NewOrdersPage,
                ConfirmOrderPage,
                InventoryPage,
                TrackInventoryPage,
                NewInventoryPage,
                DashboardPage,
                AllSearchPage,
                PlaceholderPage,
                MainPage,
                LoginPage,
                PhonePage,
                BackGroundPage,
                DriversPage,
            ],
            providers: [
                NavProxyService,
                StatusBar,
                ScreenOrientation,
                SplashScreen,
                AuthData,
                WindowRef,
                Facebook,
                GooglePlus,
                AngularFirestore,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                FileTransfer,
                FileTransferObject,
                File,
                Camera
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map