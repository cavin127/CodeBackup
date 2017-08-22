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
var formData_model_1 = require('./formData.model');
var workflow_service_1 = require('../workflow/workflow.service');
var workflow_model_1 = require('../workflow/workflow.model');
var ui_router_ng2_1 = require("ui-router-ng2");
var http_1 = require("@angular/http");
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/forkJoin');
var FormDataService = (function () {
    function FormDataService(workflowService, http, router) {
        this.workflowService = workflowService;
        this.http = http;
        this.router = router;
        this.formData = new formData_model_1.FormData();
        this.isPersonalFormValid = false;
        this.isWorkFormValid = false;
        this.isAddressFormValid = false;
    }
    FormDataService.prototype.getPersonal = function () {
        // Return the Personal data
        var personal = {
            stateList: this.formData.stateList,
            work: this.formData.work,
            sal: this.formData.sal,
            loanamt: this.formData.loanamt,
        };
        return personal;
    };
    FormDataService.prototype.setPersonal = function (data) {
        // Update the Personal data only when the Personal Form had been validated successfully
        this.isPersonalFormValid = true;
        this.formData.stateList = data.stateList;
        this.formData.work = data.work;
        this.formData.sal = data.sal;
        this.formData.loanamt = data.loanamt;
        // Validate Personal Step in Workflow
        this.workflowService.validateStep(workflow_model_1.STEPS.personal);
    };
    FormDataService.prototype.getWork = function () {
        // Return the work type
        return this.formData.work;
    };
    FormDataService.prototype.postQuoteInfo = function (formValues) {
        //localStorage.setItem('Data', JSON.stringify(formValues));
        var quoteData = {
            city: formValues.stateList,
            employerName: formValues.work,
            loanAmount: formValues.loanamt,
            loanID: 1,
            salary: formValues.sal,
        };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('https://loanappapi.azurewebsites.net/api/quote/post', JSON.stringify(quoteData), options)
            .map(function (response) {
            return response.json();
        }).catch(this.handleError);
    };
    FormDataService.prototype.getApplicationData = function (quoteId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get('http://loanappapi.azurewebsites.net/api/applicant/get?quoteId=' + quoteId, options)
            .map(function (response) {
            return response.json();
        }).catch(this.handleError);
    };
    FormDataService.prototype.addApplication = function (formValues, quoteId) {
        //localStorage.setItem('Data', JSON.stringify(formValues));
        var addApplicationData = {
            applicantID: 0,
            quoteID: quoteId,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            mobile: formValues.mobile,
            dependents: formValues.dependents,
            dob: formValues.dob,
            email: formValues.email,
            gender: formValues.gender,
            marritalStatus: formValues.maritalstatus,
            nationalInsuranceNumber: formValues.nationalInsuranceNumber,
            purposeLoan: formValues.purposeLoan,
            applicantAddresses: [{
                    addressID: 0,
                    applicantID: 0,
                    addressType: "Current",
                    address1: formValues.addressLine1,
                    address2: formValues.addressLine1,
                    city: formValues.acity,
                    country: formValues.aregion,
                    pincode: formValues.postalcode,
                    phone: formValues.aphone,
                }],
            applicantEmployers: [{
                    employerID: 0,
                    applicantID: 0,
                    employerName: formValues.employerName,
                    address1: formValues.empAddress1,
                    address2: formValues.empAddress2,
                    city: formValues.ecity,
                    country: formValues.eregion,
                    pincode: formValues.epostcode,
                    phone: formValues.ephone,
                    designation: formValues.designation,
                    salary: formValues.salary,
                    tenureWithEmployer: formValues.tenureWithEmployer,
                }]
        };
        console.log(JSON.stringify(addApplicationData));
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('http://loanappapi.azurewebsites.net/api/applicant/post', JSON.stringify(addApplicationData), options)
            .map(function (response) {
            return response.json();
        }).catch(this.handleError);
    };
    FormDataService.prototype.addLoanApplication = function (formValues, applicantId) {
        //localStorage.setItem('Data', JSON.stringify(formValues));
        var addApplicationData = {
            applicantID: applicantId,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            mobile: formValues.mobile,
            dependents: formValues.dependents,
            dob: formValues.dob,
            email: formValues.email,
            gender: formValues.gender,
            marritalStatus: formValues.maritalstatus,
            nationalInsuranceNumber: formValues.nationalInsuranceNumber,
            purposeLoan: formValues.purposeLoan,
            applicantAddresses: [{
                    address1: formValues.addressLine1,
                    address2: formValues.addressLine1,
                    city: formValues.acity,
                    country: formValues.aregion,
                    pincode: formValues.postalcode,
                    phone: formValues.aphone,
                }],
            applicantEmployers: [{
                    employerName: formValues.employerName,
                    address1: formValues.empAddress1,
                    address2: formValues.empAddress2,
                    city: formValues.ecity,
                    country: formValues.eregion,
                    pincode: formValues.epostcode,
                    phone: formValues.ephone,
                    designation: formValues.designation,
                    salary: formValues.salary,
                    tenureWithEmployer: formValues.tenureWithEmployer,
                }]
        };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('http://loanappapi.azurewebsites.net/api/loanapplication/post', JSON.stringify(addApplicationData), options)
            .map(function (response) {
            return response.json();
        }).catch(this.handleError);
    };
    FormDataService.prototype.updateApplication = function (formValues, quoteId) {
        var addApplicationData = {
            applicantID: localStorage.getItem('ApplicationId'),
            quoteID: quoteId,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            mobile: formValues.mobile,
            dependents: formValues.dependents,
            dob: formValues.dob,
            email: formValues.email,
            gender: formValues.gender,
            marritalStatus: formValues.maritalstatus,
            nationalInsuranceNumber: formValues.nationalInsuranceNumber,
            purposeLoan: formValues.purposeLoan,
            applicantAddresses: [{
                    applicantID: localStorage.getItem('ApplicationId'),
                    addressID: localStorage.getItem('addressID'),
                    addressType: "Permanent",
                    address1: formValues.addressLine1,
                    address2: formValues.addressLine1,
                    city: formValues.acity,
                    country: formValues.aregion,
                    pincode: formValues.postalcode,
                    phone: formValues.aphone,
                },
                {
                    applicantID: localStorage.getItem('ApplicationId'),
                    addressID: localStorage.getItem('addressID'),
                    addressType: "Current",
                    address1: "001",
                    address2: "Andheri",
                    city: "Mumbai",
                    pincode: "11111",
                    country: "India",
                    phone: "8888888",
                }],
            applicantEmployers: [{
                    applicantID: localStorage.getItem('ApplicationId'),
                    employerID: localStorage.getItem('employerID'),
                    employerName: formValues.employerName,
                    address1: formValues.empAddress1,
                    address2: formValues.empAddress2,
                    city: formValues.ecity,
                    country: formValues.eregion,
                    pincode: formValues.epostcode,
                    phone: formValues.ephone,
                    designation: formValues.designation,
                    salary: formValues.salary,
                    tenureWithEmployer: formValues.tenureWithEmployer,
                }]
        };
        console.log("UPDATE PAYLOAD" + JSON.stringify(addApplicationData));
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put('http://loanappapi.azurewebsites.net/api/applicant/put', JSON.stringify(addApplicationData), options)
            .map(function (response) {
            return response.json();
        }).catch(this.handleError);
    };
    FormDataService.prototype.getQuoteFromId = function (data) {
        //console.log(data);
        return this.http.get("http://loanappapi.azurewebsites.net/api/quote/get?quoteid=" + data).map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    FormDataService.prototype.setWork = function (data) {
        // Update the work type only when the Work Form had been validated successfully
        this.isWorkFormValid = true;
        this.formData.work = data;
        // Validate Work Step in Workflow
        this.workflowService.validateStep(workflow_model_1.STEPS.work);
    };
    FormDataService.prototype.getAddress = function () {
        // Return the Address data
        var address = {
            street: this.formData.street,
            city: this.formData.city,
            state: this.formData.state,
            zip: this.formData.zip
        };
        return address;
    };
    FormDataService.prototype.setAddress = function (data) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isAddressFormValid = true;
        this.formData.street = data.street;
        this.formData.city = data.city;
        this.formData.state = data.state;
        this.formData.zip = data.zip;
        // Validate Address Step in Workflow
        this.workflowService.validateStep(workflow_model_1.STEPS.address);
    };
    FormDataService.prototype.getFormData = function () {
        // Return the entire Form Data
        return this.formData;
    };
    FormDataService.prototype.resetFormData = function () {
        // Reset the workflow
        this.workflowService.resetSteps();
        // Return the form data after all this.* members had been reset
        this.formData.clear();
        this.isPersonalFormValid = this.isWorkFormValid = this.isAddressFormValid = false;
        return this.formData;
    };
    FormDataService.prototype.isFormValid = function () {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isPersonalFormValid &&
            this.isWorkFormValid &&
            this.isAddressFormValid;
    };
    FormDataService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || ' error');
    };
    FormDataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [workflow_service_1.WorkflowService, http_1.Http, ui_router_ng2_1.UIRouter])
    ], FormDataService);
    return FormDataService;
}());
exports.FormDataService = FormDataService;
//# sourceMappingURL=formData.service.js.map