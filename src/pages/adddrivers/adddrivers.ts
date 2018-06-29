import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelperProvider } from '../../provider/helper/helper';
/**
 * Generated class for the AdddriversPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adddrivers',
  templateUrl: 'adddrivers.html',
})
export class AdddriversPage {

  drivers: {
    firstName?: string;
    lastName?: string;
    dob?: any;
    employeeId?:any;
    mobileNumber?:any;
    gender?:any;
    address?:any;
    landMark?:any;
    pinCode?:any;
    mailId?:any;
    kycType?:any;
    kycNumber?:any;
    qualification?:any;
    college?:any;
    employment?:any;
    salary?:any;
    contactName?:any;
    contactNumber?:any;
    bloodGroup?:any;
    center?:any;
    role?:any;
    maritalStatus?:any;
  
  } = {};


  constructor(public helper:HelperProvider,public navCtrl: NavController, public navParams: NavParams) {

  	  	let alaphaCharaters = /^[a-zA-Z]*$/;
  	this.drivers.firstName ='';
  	this.drivers.lastName ='';
  	this.drivers.dob ='';
  	this.drivers.mobileNumber ='';
  	this.drivers.landMark ='';
  	this.drivers.address ='';
  	this.drivers.pinCode ='';
  	this.drivers.kycType ='';
  	this.drivers.kycNumber ='';
  	this.drivers.qualification ='';
  	this.drivers.college ='';
  	this.drivers.center ='';
  	this.drivers.gender ='';
  	this.drivers.salary ='';
  	this.drivers.contactName ='';
  	this.drivers.contactNumber ='';
  	this.drivers.bloodGroup ='';
  	this.drivers.role ='';
  	this.drivers.maritalStatus ='';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdddriversPage');
  }

   registerDrivers(){

  	if(this.drivers.firstName==''||!/^[a-zA-Z]*$/g.test(this.drivers.firstName)){

  		 this.helper.showMsg('first name is not alphabets','');

  	}else if(this.drivers.lastName==''||!/^[a-zA-Z]*$/g.test(this.drivers.lastName)){

  		this.helper.showMsg('second name is not alphabets','');

  	}else if(this.drivers.dob==''){

  		this.helper.showMsg('dob requried','');

  	}else if(this.drivers.mobileNumber==''||this.drivers.mobileNumber.length!=10){

  		this.helper.showMsg('mobile number invalid','');

  	}else if(this.drivers.address==''){

  		this.helper.showMsg('address required','');

  	}else if(this.drivers.pinCode==''){

  		this.helper.showMsg('pincode required','');

  	}else if(this.drivers.kycType==''){

  		this.helper.showMsg('kyctype required','');

  	}else if(this.drivers.kycNumber==''){

  		this.helper.showMsg('kycNumber required','');

  	}else if(this.drivers.qualification==''){

  		this.helper.showMsg('qualification required','');

  	}else if(this.drivers.college==''){

  		this.helper.showMsg('college required','');

  	}else if(this.drivers.center==''){

  		this.helper.showMsg('center required','');

  	}else{

  		console.log('this-------',this.drivers);
  	}

  	
  }

}
