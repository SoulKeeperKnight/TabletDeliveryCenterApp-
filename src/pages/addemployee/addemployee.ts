import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelperProvider } from '../../provider/helper/helper';
/**
 * Generated class for the AddemployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addemployee',
  templateUrl: 'addemployee.html',
})
export class AddemployeePage {
  

  employee: {
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

  constructor( public helper:HelperProvider,public navCtrl: NavController, public navParams: NavParams) {

  	
  	let alaphaCharaters = /^[a-zA-Z]*$/;
  	this.employee.firstName ='';
  	this.employee.lastName ='';
  	this.employee.dob ='';
  	this.employee.mobileNumber ='';
  	this.employee.landMark ='';
  	this.employee.address ='';
  	this.employee.pinCode ='';
  	this.employee.kycType ='';
  	this.employee.kycNumber ='';
  	this.employee.qualification ='';
  	this.employee.college ='';
  	this.employee.center ='';
  	this.employee.gender ='';
  	this.employee.salary ='';
  	this.employee.contactName ='';
  	this.employee.contactNumber ='';
  	this.employee.bloodGroup ='';
  	this.employee.role ='';
  	this.employee.maritalStatus ='';
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddemployeePage');
  }

  registerEmployee(){

  	if(this.employee.firstName==''||!/^[a-zA-Z]*$/g.test(this.employee.firstName)){

  		 this.helper.showMsg('first name is not alphabets','');

  	}else if(this.employee.lastName==''||!/^[a-zA-Z]*$/g.test(this.employee.lastName)){

  		this.helper.showMsg('second name is not alphabets','');

  	}else if(this.employee.dob==''){

  		this.helper.showMsg('dob requried','');

  	}else if(this.employee.mobileNumber==''||this.employee.mobileNumber.length!=10){

  		this.helper.showMsg('mobile number invalid','');

  	}else if(this.employee.address==''){

  		this.helper.showMsg('address required','');

  	}else if(this.employee.pinCode==''){

  		this.helper.showMsg('pincode required','');

  	}else if(this.employee.kycType==''){

  		this.helper.showMsg('kyctype required','');

  	}else if(this.employee.kycNumber==''){

  		this.helper.showMsg('kycNumber required','');

  	}else if(this.employee.qualification==''){

  		this.helper.showMsg('qualification required','');

  	}else if(this.employee.college==''){

  		this.helper.showMsg('college required','');

  	}else if(this.employee.center==''){

  		this.helper.showMsg('center required','');

  	}else{

  		console.log('this-------',this.employee);
  	}

  	
  }

}
