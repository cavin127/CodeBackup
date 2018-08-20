import { Injectable }                        from '@angular/core';

import { FormData, Personal, Address }       from './formData.model';

import { Router } from '@angular/router'
import {Http, Request, Response, Headers, RequestOptionsArgs, RequestMethod, Jsonp, URLSearchParams ,RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';



@Injectable()
export class FormDataService {

    private formData: FormData = new FormData();
    private isPersonalFormValid: boolean = false;
    private isWorkFormValid: boolean = false;
    private isAddressFormValid: boolean = false;

    constructor(private http: Http,private router:Router) { 
    }

    getPersonal(): Personal {
        // Return the Personal data
        var personal: Personal = {
            stateList: this.formData.stateList,
            work: this.formData.work,
            sal: this.formData.sal,
            loanamt:this.formData.loanamt,
        };
        
        return personal;
    }

    setPersonal(data: Personal) {
        // Update the Personal data only when the Personal Form had been validated successfully
        this.isPersonalFormValid = true;
        this.formData.stateList = data.stateList;
        this.formData.work = data.work;
        this.formData.sal = data.sal;
        this.formData.loanamt = data.loanamt;
        // Validate Personal Step in Workflow
        //this.workflowService.validateStep(STEPS.personal);
    }

    getWork() : string {
        // Return the work type
        return this.formData.work;
    }


    getOcrData(event) {
        let headers = new Headers({ 'Content-Type': 'application/octet-stream', "Ocp-Apim-Subscription-Key": '20ae761264914346a1447649a598751b'});
        let options = new RequestOptions({ headers: headers });
        let data = [];

        return this.http.post('https://westus.api.cognitive.microsoft.com/vision/v1.0/ocr', event.targetFile, options)
          .map((response: Response) => {
              data.push({
                  "targetFile" : event,
                  "OcrData" : response.json()
              })
            return <any>data;
          }).catch(this.handleError);

      //}
    }

    uploadFileApi(val) {
      
      let headers = new Headers();
      headers.delete("Content-Type");
      let options = new RequestOptions({ headers: headers });


      //console.log(JSON.stringify(val));
      return this.http.post('https://loanappapi.azurewebsites.net/api/LoanApplicationDocument/UploadFile', val, options)
      //return this.http.post('http://localhost:24879/api/LoanApplicationDocument/UploadFile', val, options)
      .map((response: Response) => {
         // return <any>response.json();
        }).catch(this.handleError);
    }


    deleteFile(data){
            let id = localStorage.getItem('quoteid');
            console.log(data.fileName);
            console.log(data.id);
            console.log(parseInt(id));
            return this.http.get('http://loanappapi.azurewebsites.net/api/LoanApplicationDocument/DeleteLoanApplicationDocumentByID?QuoteId='+parseInt(id)+'&DocumentId='+data.id+'&FileName='+data.fileName)
             .map((response: Response) => {
               return <any>response;
             })
        }
    postQuoteInfo(formValues) {
        
       //sessionStorage.setItem('Data', JSON.stringify(formValues));
       var quoteData= {
            city: formValues.stateList,
            employerName: formValues.work,
            loanAmount:formValues.loanamt,
            loanID :1,
            salary: formValues.sal,
            
        };

       
       
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post('https://loanappapi.azurewebsites.net/api/quote/post', JSON.stringify(quoteData),options)
           .map((response: Response) => {
              return <any>response.json();
        }).catch(this.handleError);


        
    }

    getApplicationData(quoteId){

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       
        return this.http.get('http://loanappapi.azurewebsites.net/api/applicant/get?quoteId='+quoteId,options)
           .map((response: Response) => {
              return <any>response.json();
        }).catch(this.handleError);


    }

     addApplication(formValues,quoteId) {
        
       //sessionStorage.setItem('Data', JSON.stringify(formValues));
       var addApplicationData= {
            applicantID:0,
            quoteID:quoteId,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            mobile:formValues.mobile,
            dependents :formValues.dependents,
            dob: formValues.dob,
            email: formValues.email,
            gender: formValues.gender,
            marritalStatus: formValues.maritalstatus,
            nationalInsuranceNumber: formValues.nationalInsuranceNumber,
            purposeLoan:formValues.purposeLoan,
            applicantAddresses:[{
                  addressID:0,
                  applicantID:0,
                  addressType:"Current",
                  address1: formValues.addressLine1,
                  address2: formValues.addressLine1,
                  city: formValues.acity,
                  country: formValues.aregion,
                  pincode: formValues.postalcode,
                  phone: formValues.aphone,
                  
            }],
            applicantEmployers:[{
                employerID:0,
                applicantID:0,
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

      

       //console.log(JSON.stringify(addApplicationData));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       
        return this.http.post('http://loanappapi.azurewebsites.net/api/applicant/post', JSON.stringify(addApplicationData),options)
           .map((response: Response) => {
              return <any>response.json();
        }).catch(this.handleError);


        
    }

     getUploadFile(quoteId): Observable<any> {

       var addApplicationData = { QuoteId: quoteId}
       //let headers = new Headers({ 'Content-Type': 'application/json' });
       //let options = new RequestOptions({ headers: headers });

       //return this.http.post('http://loanappapi.azurewebsites.net/api/LoanApplicationDocument/GetLoanApplicationDocumentQuoteID', JSON.stringify(addApplicationData), options)
       return this.http.get('http://loanappapi.azurewebsites.net/api/LoanApplicationDocument/GetLoanApplicationDocumentQuoteID?QuoteID='+quoteId)
         .map((response: Response) => {
           return <any>response.json().loanAppDocuments;
         }).catch(this.handleError);


     }

    addLoanApplication(formValues,applicantId) {
        
       //sessionStorage.setItem('Data', JSON.stringify(formValues));
       var addApplicationData= {
            applicantID:applicantId,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            mobile:formValues.mobile,
            dependents :formValues.dependents,
            dob: formValues.dob,
            email: formValues.email,
            gender: formValues.gender,
            marritalStatus: formValues.maritalstatus,
            nationalInsuranceNumber: formValues.nationalInsuranceNumber,
            purposeLoan: formValues.purposeLoan,
            applicantAddresses:[{
                  address1: formValues.addressLine1,
                  address2: formValues.addressLine1,
                  city: formValues.acity,
                  country: formValues.aregion,
                  pincode: formValues.postalcode,
                  phone: formValues.aphone,
                  
            }],
            applicantEmployers:[{
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

       
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       
        return this.http.post('http://loanappapi.azurewebsites.net/api/loanapplication/post', JSON.stringify(addApplicationData),options)
           .map((response: Response) => {
              return <any>response.json();
        }).catch(this.handleError);


        
    }

    updateApplication(formValues,quoteId,appid,addID,empID){

            var addApplicationData= {
            applicantID: appid,
            quoteID:quoteId,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            mobile:formValues.mobile,
            dependents :formValues.dependents,
            dob: formValues.dob,
            email: formValues.email,
            gender: formValues.gender,
            marritalStatus: formValues.maritalstatus,
            nationalInsuranceNumber: formValues.nationalInsuranceNumber,
            purposeLoan: formValues.purposeLoan,
            applicantAddresses:[{
              applicantID: appid,
                  addressID: addID,
                  addressType:"Permanent",
                  address1: formValues.addressLine1,
                  address2: formValues.addressLine2,
                  city: formValues.acity,
                  country: formValues.aregion,
                  pincode: formValues.postalcode,
                  phone: formValues.aphone,
                  
            }],

            
            applicantEmployers:[{
              applicantID: appid,
              employerID: empID,
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



        //console.log("UPDATE PAYLOAD"+JSON.stringify(addApplicationData));
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       
        return this.http.put('http://loanappapi.azurewebsites.net/api/applicant/put', JSON.stringify(addApplicationData),options)
           .map((response: Response) => {
              return <any>response.json();
        }).catch(this.handleError);


    }


    getQuoteFromId(data:any): Observable<any>{ 
        //console.log(data);
      return this.http.get(`http://loanappapi.azurewebsites.net/api/quote/get?quoteid=` + data).map((res: Response) => {
        localStorage.setItem('quoteid', res.json()[0].quoteID);
            return <any>res.json();
        })
        .catch(this.handleError);  

           
            
           
    }
    
    setWork(data: string) {
        // Update the work type only when the Work Form had been validated successfully
        this.isWorkFormValid = true;
        this.formData.work = data;
        // Validate Work Step in Workflow
        //this.workflowService.validateStep(STEPS.work);
    }

    getAddress() : Address {
        // Return the Address data
        var address: Address = {
            street: this.formData.street,
            city: this.formData.city,
            state: this.formData.state,
            zip: this.formData.zip
        };
        return address;
    }

    setAddress(data: Address) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isAddressFormValid = true;
        this.formData.street = data.street;
        this.formData.city = data.city;
        this.formData.state = data.state;
        this.formData.zip = data.zip;
        // Validate Address Step in Workflow
        //this.workflowService.validateStep(STEPS.address);
    }

    getFormData(): FormData {
        // Return the entire Form Data
        return this.formData;
    }

    resetFormData(): FormData {
        // Reset the workflow
       // this.workflowService.resetSteps();
        // Return the form data after all this.* members had been reset
        this.formData.clear();
        this.isPersonalFormValid = this.isWorkFormValid = this.isAddressFormValid = false;
        return this.formData;
    }

    isFormValid() {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isPersonalFormValid &&
                this.isWorkFormValid && 
                this.isAddressFormValid;
    }

     private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || ' error');
    }
    
 
  
}
