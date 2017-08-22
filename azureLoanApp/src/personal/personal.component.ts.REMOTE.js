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
var forms_1 = require('@angular/forms');
var ui_router_ng2_1 = require("ui-router-ng2");
var PersonalComponent = (function () {
    function PersonalComponent(formDataService, router) {
        var _this = this;
        this.formDataService = formDataService;
        this.router = router;
        this.title = 'Get your personal loan quote in just seconds';
        this.stateListData1 = [{ "name": "Mastek", "abbreviation": "AL" }, { "name": "Infosys", "abbreviation": "AL" }, { "name": "Cognizant", "abbreviation": "AL" }, { "name": "IBM", "abbreviation": "AL" }, { "name": "Hexaware", "abbreviation": "AL" }, { "name": "Atos", "abbreviation": "AL" }];
        this.typeAheadSetup1 = {
            customTemplate: '<div> {{item.name}}</div>',
            //    timeDelay: number; 
            // type: 'static', //static || dynamic.  default value is dynamic 
            placeHolder: 'Work Place',
            textPrperty: 'name',
            valueProperty: 'name',
            searchProperty: 'name',
            onSelect: function (selectedItem) { console.log(selectedItem); },
            asynchDataCall: function (value, cb) {
                var result1 = _this.stateListData1.filter(function (item) {
                    return item.name.indexOf(value) !== -1;
                });
                //you can place your webservice call here 
                setTimeout(function () {
                    cb(result1);
                }, 200);
            },
        };
        this.stateListData = [{ "name": "Avon", "abbreviation": "AL" }, { "name": "Ayrshire", "abbreviation": "AL" }, { "name": "Bedfordshire", "abbreviation": "AL" }, { "name": "Cambridgeshire", "abbreviation": "AL" }, { "name": "Ceredigion", "abbreviation": "AL" }, { "name": "Glasgow", "abbreviation": "AL" }, { "name": "Greater Manchester", "abbreviation": "AL" }, { "name": "Leeds", "abbreviation": "AL" }, { "name": "London", "abbreviation": "AL" }, { "name": "Bradford", "abbreviation": "AL" }];
        this.typeAheadSetup = {
            customTemplate: '<div> {{item.name}}</div>',
            //    timeDelay: number; 
            // type: 'static', //static || dynamic.  default value is dynamic 
            placeHolder: 'State name',
            textPrperty: 'name',
            valueProperty: 'name',
            searchProperty: 'name',
            onSelect: function (selectedItem) { console.log(selectedItem); },
            asynchDataCall: function (value, cb) {
                var result = _this.stateListData.filter(function (item) {
                    return item.name.indexOf(value) !== -1;
                });
                //you can place your webservice call here 
                setTimeout(function () {
                    cb(result);
                }, 200);
            },
        };
    }
    PersonalComponent.prototype.ngOnInit = function () {
        //this.personal = this.formDataService.getPersonal();
        //console.log('Personal feature loaded!');
        this.quoteData = JSON.parse(localStorage.getItem('getQuoteData'));
        this.stateList = new forms_1.FormControl(this.quoteData.city);
        this.work = new forms_1.FormControl(this.quoteData.employerName);
        this.sal = new forms_1.FormControl(this.quoteData.salary);
        this.loanamt = new forms_1.FormControl(this.quoteData.loanAmount);
        this.loanInfoForm = new forms_1.FormGroup({
            stateList: this.stateList,
            work: this.work,
            sal: this.sal,
            loanamt: this.loanamt,
        });
    };
    PersonalComponent.prototype.myFunc = function () {
        this.router.stateService.go('offer');
    };
    PersonalComponent.prototype.saveInfo = function (formValues) {
        var _this = this;
        this.formDataService.postQuoteInfo(formValues)
            .subscribe(function (data) {
            _this.quoteDataFromApi_val = JSON.stringify(data);
            //console.log("==========="+this.quoteDataFromApi);
            localStorage.setItem('getQuoteData', _this.quoteDataFromApi_val);
            /* this.router.stateService.go('offer');*/
        }, function (error) {
            _this.error = error;
            //console.log(this.error);
        });
    };
    PersonalComponent.prototype.rangeValueChanged = function (event, start, end) {
        var start_el = this.getElement(start);
        var end_el = this.getElement(end);
        // start_el.innerText = event.startValue;
        //end_el.innerText = event.endValue;
    };
    PersonalComponent.prototype.getElement = function (data) {
        if (typeof (data) == 'string') {
            return document.getElementById(data);
        }
        if (typeof (data) == 'object' && data instanceof Element) {
            return data;
        }
        return null;
    };
    PersonalComponent = __decorate([
        core_1.Component({
            selector: 'mt-wizard-personal',
            templateUrl: 'app/personal/personal.component.html'
        }), 
        __metadata('design:paramtypes', [formData_service_1.FormDataService, ui_router_ng2_1.UIRouter])
    ], PersonalComponent);
    return PersonalComponent;
}());
exports.PersonalComponent = PersonalComponent;
//# sourceMappingURL=personal.component.ts.REMOTE.js.map