var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { PlaceholderPage } from '../pages/placeholder/placeholder';
import { _DetailPage } from '../pages/_DetailPage';
var NavProxyService = /** @class */ (function () {
    function NavProxyService() {
        this._masterNav = null;
        this._detailNav = null;
        this._isOn = false;
    }
    Object.defineProperty(NavProxyService.prototype, "masterNav", {
        get: function () {
            return this._masterNav;
        },
        set: function (value) {
            this._masterNav = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavProxyService.prototype, "detailNav", {
        get: function () {
            return this._detailNav;
        },
        set: function (value) {
            this._detailNav = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavProxyService.prototype, "isOn", {
        get: function () {
            return this._isOn;
        },
        set: function (value) {
            this._isOn = value;
        },
        enumerable: true,
        configurable: true
    });
    NavProxyService.prototype.pushDetail = function (page, params) {
        this.isOn = true;
        if (this.isOn) {
            this.detailNav.setRoot(page, params);
        }
        else {
            this.masterNav.push(page, params);
        }
    };
    NavProxyService.prototype.pushMaster = function (page, params) {
        this.masterNav.push(page, params);
    };
    NavProxyService.prototype.onSplitPaneChanged = function (isOn) {
        // set local 'isOn' flag...
        this.isOn = isOn;
        // if the nav controllers have been instantiated...
        if (this.masterNav && this.detailNav) {
            (isOn) ? this.activateSplitView() :
                this.deactivateSplitView();
        }
    };
    NavProxyService.prototype.activateSplitView = function () {
        var currentView = this.masterNav.getActive();
        if (currentView.component.prototype instanceof _DetailPage) {
            // if the current view is a 'Detail' page...
            // - remove it from the 'master' nav stack...
            this.masterNav.pop();
            // - and add it to the 'detail' nav stack...
            this.detailNav.setRoot(currentView.component, currentView.data);
        }
    };
    NavProxyService.prototype.deactivateSplitView = function () {
        var detailView = this.detailNav.getActive();
        this.detailNav.setRoot(PlaceholderPage);
        if (detailView.component.prototype instanceof _DetailPage) {
            // if the current detail view is a 'Detail' page...
            // ...so, not the placeholder page:
            var index = this.masterNav.getViews().length;
            // add it to the master view...
            this.masterNav.insert(index, detailView.component, detailView.data);
        }
    };
    NavProxyService = __decorate([
        Injectable()
    ], NavProxyService);
    return NavProxyService;
}());
export { NavProxyService };
//# sourceMappingURL=NavProxy.service.js.map