"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var formData_service_1 = require('../data/formData.service');
var ui_router_ng2_1 = require("ui-router-ng2");
var WorkComponent = (function () {
    function WorkComponent(formDataService, router) {
        this.formDataService = formDataService;
        this.router = router;
        this.title = 'What do you do?';
    }
    WorkComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.quoteData = localStorage.getItem('getQuoteData');
        var obj = JSON.parse(this.quoteData);
        this.interestRate = obj.interestRate;
        this.emi = obj.monthlyEMI;
        //console.log(obj.quoteID);
        if (obj.quoteID != null) {
            console.log("quote" + obj.quoteID);
            this.formDataService.getApplicationData(obj.quoteID)
                .subscribe(function (data) {
                if (data != '') {
                    _this.applicationDataGet = JSON.stringify(data);
                    console.log("work +++" + _this.applicationDataGet);
                    localStorage.setItem('applicant_data', _this.applicationDataGet);
                }
                else {
                    localStorage.removeItem('applicant_data');
                    localStorage.removeItem('ApplicationId');
                }
                /* this.router.stateService.go('offer');*/
            }, function (error) {
                _this.error = error;
                //console.log(this.error);
            });
        }
        /*this.formDataService.getQuoteApi(this.quoteData)
        .subscribe(
         data=> {
      this.quoteDataFromApi = JSON.stringify(data);
      //console.log(this.quoteDataFromApi);
      
      this.interestRate = data[0]['interestRate'];
      this.emi = data[0]['monthlyEMI'];
    }); */
    };
    WorkComponent.prototype.rangeValueChanged1 = function (event, start, end) {
        var start_el = this.getElement1(start);
        var end_el = this.getElement1(end);
        start_el.innerHTML = event.startValue;
        end_el.innerHTML = event.endValue;
    };
    WorkComponent.prototype.getElement1 = function (data) {
        if (typeof (data) == 'string') {
            return document.getElementById(data);
        }
        if (typeof (data) == 'object' && data instanceof Element) {
            return data;
        }
        return null;
    };
    WorkComponent.prototype.rangeValueChanged = function (event, start, end) {
        var start_el = this.getElement(start);
        var end_el = this.getElement(end);
        start_el.innerHTML = event.startValue;
        end_el.innerHTML = event.endValue;
    };
    WorkComponent.prototype.getElement = function (data) {
        if (typeof (data) == 'string') {
            return document.getElementById(data);
        }
        if (typeof (data) == 'object' && data instanceof Element) {
            return data;
        }
        return null;
    };
    WorkComponent.prototype.save = function (form) {
        if (!form.valid)
            return;
        this.formDataService.setWork(this.workType);
    };
    WorkComponent.prototype.saveForm = function () {
        this.router.stateService.go('address');
    };
    WorkComponent = __decorate([
        core_1.Component({
            selector: 'mt-wizard-work',
            templateUrl: 'app/work/work.component.html'
        }), 
        __metadata('design:paramtypes', [formData_service_1.FormDataService, ui_router_ng2_1.UIRouter])
    ], WorkComponent);
    return WorkComponent;
}());
exports.WorkComponent = WorkComponent;
//# sourceMappingURL=work.component.js.map