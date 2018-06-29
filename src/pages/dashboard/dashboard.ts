import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as $ from "jquery";

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Hourly Event'},
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: false
  };
  public lineChartColors:Array<any> = [
    { // dark grey
      backgroundColor: '#7bc043',
      borderWidth: 8,
      borderColor: '#7bc043',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#7bc043',
      pointBorderWidth: 15,
      fill: false,
    
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public point;

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(public navCtrl: NavController) {
    setInterval(()=>{
      $('.pol-1').attr('points',this.point);
    },1);
  }
  ngOnInit() {
    setInterval(()=>{
      $('.pol-1').attr('points',this.point);
    },1);
  }
  ionViewDidLoad() {
    this.point = "00,120 20,60 40,80  60,20 80,80 100,80  180,80 200, 110 380, 180 420, 70 500, 100";
    $('.pol-1').attr('points',this.point);

   
  }
  

}