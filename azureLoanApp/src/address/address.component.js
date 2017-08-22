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
var forms_1 = require('@angular/forms');
var formData_service_1 = require('../data/formData.service');
var ui_router_ng2_1 = require("ui-router-ng2");
var AddressComponent = (function () {
    function AddressComponent(formDataService, router) {
        this.formDataService = formDataService;
        this.router = router;
        this.title = 'Where do you live?';
    }
    AddressComponent.prototype.ngOnInit = function () {
        //this.sessionApplicationId = 
        this.getApplicantData = JSON.parse(localStorage.getItem('applicant_data'));
        this.firstName = new forms_1.FormControl();
        this.lastName = new forms_1.FormControl();
        this.mobile = new forms_1.FormControl();
        this.dependents = new forms_1.FormControl('Select');
        this.dob = new forms_1.FormControl();
        this.email = new forms_1.FormControl();
        this.gender = new forms_1.FormControl();
        this.maritalstatus = new forms_1.FormControl();
        this.nationalInsuranceNumber = new forms_1.FormControl();
        this.purposeLoan = new forms_1.FormControl();
        this.addressLine1 = new forms_1.FormControl();
        this.addressLine2 = new forms_1.FormControl();
        this.acity = new forms_1.FormControl();
        this.aregion = new forms_1.FormControl('Select');
        this.postalcode = new forms_1.FormControl();
        this.aphone = new forms_1.FormControl();
        this.employerName = new forms_1.FormControl();
        this.empAddress1 = new forms_1.FormControl();
        this.empAddress2 = new forms_1.FormControl();
        this.ecity = new forms_1.FormControl();
        this.eregion = new forms_1.FormControl('Select');
        this.epostcode = new forms_1.FormControl();
        this.ephone = new forms_1.FormControl();
        this.designation = new forms_1.FormControl();
        this.salary = new forms_1.FormControl();
        this.tenureWithEmployer = new forms_1.FormControl('Select');
        this.personalInfoForm = new forms_1.FormGroup({
            firstName: this.firstName,
            lastName: this.lastName,
            mobile: this.mobile,
            dependents: this.dependents,
            dob: this.dob,
            email: this.email,
            gender: this.gender,
            maritalstatus: this.maritalstatus,
            nationalInsuranceNumber: this.nationalInsuranceNumber,
            purposeLoan: this.purposeLoan,
            addressLine1: this.addressLine1,
            addressLine2: this.addressLine2,
            acity: this.acity,
            aregion: this.aregion,
            postalcode: this.postalcode,
            aphone: this.aphone,
            employerName: this.employerName,
            empAddress1: this.empAddress1,
            empAddress2: this.empAddress2,
            ecity: this.ecity,
            eregion: this.eregion,
            epostcode: this.epostcode,
            ephone: this.ephone,
            designation: this.designation,
            salary: this.salary,
            tenureWithEmployer: this.tenureWithEmployer,
        });
        if (this.getApplicantData != null) {
            if (this.getApplicantData[0]['dob'] != null) {
                this.personalInfoForm.patchValue({
                    dob: this.getApplicantData[0]['dob'].substr(0, JSON.stringify(this.getApplicantData[0]['dob']).length - 11),
                });
            }
            this.personalInfoForm.patchValue({
                firstName: this.getApplicantData[0]['firstName'],
                lastName: this.getApplicantData[0]['lastName'],
                mobile: this.getApplicantData[0]['mobile'],
                dependents: this.getApplicantData[0]['dependents'],
                email: this.getApplicantData[0]['email'],
                gender: this.getApplicantData[0]['gender'],
                maritalstatus: this.getApplicantData[0]['marritalStatus'],
                nationalInsuranceNumber: this.getApplicantData[0]['nationalInsuranceNumber'],
                purposeLoan: this.getApplicantData[0]['purposeLoan'],
            });
            if (this.getApplicantData[0]['applicantAddresses'].length !== 0) {
                this.personalInfoForm.patchValue({
                    addressLine1: this.getApplicantData[0]['applicantAddresses'][0]['address1'],
                    addressLine2: this.getApplicantData[0]['applicantAddresses'][0]['address2'],
                    acity: this.getApplicantData[0]['applicantAddresses'][0]['city'],
                    aregion: this.getApplicantData[0]['applicantAddresses'][0]['country'],
                    postalcode: this.getApplicantData[0]['applicantAddresses'][0]['pincode'],
                    aphone: this.getApplicantData[0]['applicantAddresses'][0]['phone'],
                });
            }
            if (this.getApplicantData[0]['applicantEmployers'].length !== 0) {
                this.personalInfoForm.patchValue({
                    employerName: this.getApplicantData[0]['applicantEmployers'][0]['employerName'],
                    empAddress1: this.getApplicantData[0]['applicantEmployers'][0]['address1'],
                    empAddress2: this.getApplicantData[0]['applicantEmployers'][0]['address2'],
                    ecity: this.getApplicantData[0]['applicantEmployers'][0]['city'],
                    eregion: this.getApplicantData[0]['applicantEmployers'][0]['country'],
                    epostcode: this.getApplicantData[0]['applicantEmployers'][0]['pincode'],
                    ephone: this.getApplicantData[0]['applicantEmployers'][0]['phone'],
                    designation: this.getApplicantData[0]['applicantEmployers'][0]['designation'],
                    salary: this.getApplicantData[0]['applicantEmployers'][0]['salary'],
                    tenureWithEmployer: this.getApplicantData[0]['applicantEmployers'][0]['tenureWithEmployer'],
                });
            }
        }
    };
    AddressComponent.prototype.applicationSubmit = function (formValues) {
        var _this = this;
        this.formDataService.addLoanApplication(formValues, this.sessionApplicationId)
            .subscribe(function (data) {
            console.log(data);
            // localStorage.removeItem('ApplicationId');
            alert("Application Saved Successfully");
        }, function (error) {
            _this.error = error;
            //console.log(this.error);
        });
    };
    AddressComponent.prototype.saveInfo = function (formValues) {
        var _this = this;
        this.sessionApplicationId = localStorage.getItem('ApplicationId');
        this.quoteData = localStorage.getItem('getQuoteData');
        var obj = JSON.parse(this.quoteData);
        this.quoteId = obj.quoteID;
        console.log("+++++" + this.sessionApplicationId);
        if (this.sessionApplicationId == null) {
            this.formDataService.addApplication(formValues, this.quoteId)
                .subscribe(function (data) {
                console.log("POST DATA" + JSON.stringify(data));
                localStorage.setItem("ApplicationId", data.applicantID);
                localStorage.setItem("addressID", data.applicantAddresses['0']['addressID']);
                localStorage.setItem("employerID", data.applicantEmployers['0']['employerID']);
            }, function (error) {
                _this.error = error;
                //console.log(this.error);
            });
        }
        if (this.sessionApplicationId) {
            this.formDataService.updateApplication(formValues, this.quoteId)
                .subscribe(function (data) {
                console.log("anand bhai" + JSON.stringify(data));
                //this.applicationDataGet = JSON.stringify(data);
                //localStorage.setItem('applicant_data',this.applicationDataGet);
                //localStorage.removeItem('applicant_data');
                // console.log(localStorage.getItem('applicant_data'));
            }, function (error) {
                _this.error = error;
                //console.log(this.error);
            });
        }
    };
    AddressComponent.prototype.applicantSummary = function (val) {
        console.log(val + "loaded");
    };
    AddressComponent.prototype.save = function (form) {
        if (!form.valid)
            return;
        this.formDataService.setAddress(this.address);
    };
    AddressComponent.prototype.formatDate = function (date) {
        return date.toLocaleString();
    };
    AddressComponent.prototype.onSelect = function (date) {
        console.log("onSelect: ", date);
    };
    AddressComponent.prototype.clearDate = function () {
        this.date = null;
    };
    AddressComponent.prototype.setToday = function () {
        this.date = new Date();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], AddressComponent.prototype, "testRangeDate", void 0);
    AddressComponent = __decorate([
        core_1.Component({
            selector: 'mt-wizard-address',
            templateUrl: 'app/address/address.component.html'
        }), 
        __metadata('design:paramtypes', [formData_service_1.FormDataService, ui_router_ng2_1.UIRouter])
    ], AddressComponent);
    return AddressComponent;
}());
exports.AddressComponent = AddressComponent;
//# sourceMappingURL=address.component.js.map