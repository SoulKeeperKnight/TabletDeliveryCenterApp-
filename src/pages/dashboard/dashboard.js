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
import { NavController } from 'ionic-angular';
import * as $ from "jquery";
var DashboardPage = /** @class */ (function () {
    function DashboardPage(navCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.lineChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Hourly Event' },
        ];
        this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChartOptions = {
            responsive: false
        };
        this.lineChartColors = [
            {
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
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        setInterval(function () {
            $('.pol-1').attr('points', _this.point);
        }, 1);
    }
    DashboardPage.prototype.randomize = function () {
        var _lineChartData = new Array(this.lineChartData.length);
        for (var i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
            for (var j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }
        this.lineChartData = _lineChartData;
    };
    // events
    DashboardPage.prototype.chartClicked = function (e) {
        console.log(e);
    };
    DashboardPage.prototype.chartHovered = function (e) {
        console.log(e);
    };
    DashboardPage.prototype.ngOnInit = function () {
        var _this = this;
        setInterval(function () {
            $('.pol-1').attr('points', _this.point);
        }, 1);
    };
    DashboardPage.prototype.ionViewDidLoad = function () {
        this.point = "00,120 20,60 40,80  60,20 80,80 100,80  180,80 200, 110 380, 180 420, 70 500, 100";
        $('.pol-1').attr('points', this.point);
    };
    DashboardPage = __decorate([
        Component({
            selector: 'page-dashboard',
            templateUrl: 'dashboard.html'
        }),
        __metadata("design:paramtypes", [NavController])
    ], DashboardPage);
    return DashboardPage;
}());
export { DashboardPage };
//# sourceMappingURL=dashboard.js.map