import { Injectable } from "@angular/core";
import { Events, ToastController, ActionSheetController } from "ionic-angular";


/*
  Generated class for the HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelperProvider {
  data: any;
  previousStatus:string='online';

  constructor(  
  	public events: Events,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController) {
    
  }



  getError(data) {
    let error_msg = "";
    for (var key in data) {
      error_msg = error_msg + data[key];
    }
    return error_msg;
  }

  

  showMsg(msg, classname) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "top",
      cssClass: classname
    });

    toast.present();
  }


}
