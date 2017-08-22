import { Component, OnInit ,Input }   from '@angular/core';
import { FormControl, FormGroup , Validators} from '@angular/forms'

import { Address }             from '../data/formData.model';
import { FormDataService }     from '../data/formData.service';
import { Router } from '@angular/router'

@Component ({
    selector:     'mt-wizard-address'
    ,templateUrl: 'address.component.html'
})

export class AddressComponent implements OnInit {

    personalInfoForm:FormGroup;
    getApplicantData:any;
    firstName:FormControl;
    lastName:FormControl;
    mobile:FormControl;
    dependents:FormControl;
    dob:FormControl;
    email:FormControl;
    gender:FormControl;
    maritalstatus:FormControl;
    nationalInsuranceNumber:FormControl;
    purposeLoan:FormControl;

    addressLine1:FormControl;
    addressLine2:FormControl;
    acity:FormControl;
    aregion:FormControl;
    postalcode:FormControl;
    aphone:FormControl;



    employerName:FormControl;
    empAddress1:FormControl;
    empAddress2:FormControl;
    ecity:FormControl;
    eregion:FormControl;
    epostcode:FormControl;
    ephone:FormControl;
    designation:FormControl;
    salary:FormControl;
    tenureWithEmployer:FormControl;
    
    
    title = 'Where do you live?';
    address: Address;
    form: any;
    date: Date;
    disabled: boolean;
    @Input() testRangeDate: Date;
    applicationData:any;
    error:any;
    sessionApplicationId:any;
    applicationDataGet:any;
    quoteData:any;
    quoteId:number;

    constructor(private formDataService: FormDataService,private router:Router) {
        


    }


   
    ngOnInit() {

         //this.sessionApplicationId = 
         

        this.getApplicantData = JSON.parse(localStorage.getItem('applicant_data'));
        this.firstName = new FormControl();

        this.lastName = new FormControl();
        this.mobile = new FormControl();
        this.dependents = new FormControl('Select');
        this.dob = new FormControl();
        this.email = new FormControl();
        this.gender = new FormControl();
        this.maritalstatus = new FormControl();
        this.nationalInsuranceNumber = new FormControl();
        this.purposeLoan = new FormControl();

        this.addressLine1 = new FormControl();
        this.addressLine2 = new FormControl();
        this.acity = new FormControl();
        this.aregion = new FormControl('Select');
        this.postalcode = new FormControl();
        this.aphone = new FormControl();

        this.employerName = new FormControl();
        this.empAddress1 = new FormControl();
        this.empAddress2 = new FormControl();
        this.ecity = new FormControl();
        this.eregion = new FormControl('Select');
        this.epostcode = new FormControl();
        this.ephone = new FormControl();
        this.designation = new FormControl();
        this.salary = new FormControl();
        this.tenureWithEmployer = new FormControl('Select');



        this.personalInfoForm = new FormGroup({
            firstName :this.firstName,
            lastName : this.lastName,
            mobile : this.mobile,
            dependents : this.dependents,
            dob : this.dob,
            email : this.email,
            gender : this.gender,
            maritalstatus : this.maritalstatus,
            nationalInsuranceNumber: this.nationalInsuranceNumber,
            purposeLoan: this.purposeLoan,
            addressLine1 : this.addressLine1,
            addressLine2 : this.addressLine2,
            acity : this.acity,
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
            
     })

        
        if(this.getApplicantData != null ) 
        {

            if(this.getApplicantData[0]['dob'] != null)
            {
                this.personalInfoForm.patchValue({
                dob: this.getApplicantData[0]['dob'].substr(0,JSON.stringify(this.getApplicantData[0]['dob']).length-11),
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

           

            // formControlName2: myValue2 (can be omitted)
        });
        
        if(this.getApplicantData[0]['applicantAddresses'].length !== 0)
        {
            this.personalInfoForm.patchValue({

                addressLine1 : this.getApplicantData[0]['applicantAddresses'][0]['address1'],
                addressLine2 : this.getApplicantData[0]['applicantAddresses'][0]['address2'],
                acity : this.getApplicantData[0]['applicantAddresses'][0]['city'],
                aregion: this.getApplicantData[0]['applicantAddresses'][0]['country'],
                postalcode: this.getApplicantData[0]['applicantAddresses'][0]['pincode'],
                aphone: this.getApplicantData[0]['applicantAddresses'][0]['phone'],
                

             });

        }

        if(this.getApplicantData[0]['applicantEmployers'].length !== 0)
        {
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
        
        
    }


    
    applicationSubmit(formValues){

       this.formDataService.addLoanApplication(formValues, this.sessionApplicationId)
            .subscribe(
                data => {
                   console.log(data);
                  // localStorage.removeItem('ApplicationId');

                   alert("Application Saved Successfully");
                  
                },
                error => {
                    this.error = error
                    //console.log(this.error);
                });

    }

    saveInfo(formValues){
        this.sessionApplicationId = localStorage.getItem('ApplicationId');


        this.quoteData = localStorage.getItem('getQuoteData');
        let obj = JSON.parse(this.quoteData);
        this.quoteId = obj.quoteID;
        console.log("+++++"+this.sessionApplicationId);

       
        if(this.sessionApplicationId == null)
        {
            
            

            this.formDataService.addApplication(formValues, this.quoteId)
            .subscribe(
                data => {
                   console.log("POST DATA"+JSON.stringify(data));
                   
                   localStorage.setItem("ApplicationId",data.applicantID)
                   localStorage.setItem("addressID",data.applicantAddresses['0']['addressID'])
                   localStorage.setItem("employerID",data.applicantEmployers['0']['employerID'])

                      
                },
                error => {
                    this.error = error
                    //console.log(this.error);
                });

        }
         
        if(this.sessionApplicationId)
        {
       
            this.formDataService.updateApplication(formValues, this.quoteId)
            .subscribe(
                data => {
                  console.log("anand bhai"+JSON.stringify(data));
                   //this.applicationDataGet = JSON.stringify(data);
                   //localStorage.setItem('applicant_data',this.applicationDataGet);
                   //localStorage.removeItem('applicant_data');
                  // console.log(localStorage.getItem('applicant_data'));
                      
                },
                error => {
                    this.error = error
                    //console.log(this.error);
                });
        }
        
    }

    applicantSummary(val) {

        console.log(val+"loaded");
    }
    save(form: any) {
        if (!form.valid) 
            return;
        
       // this.formDataService.setAddress(this.address);
    }

        formatDate(date: Date): string {
        return date.toLocaleString();
    }

    onSelect(date: Date) {
        console.log("onSelect: ", date);
    }
    clearDate() {
        this.date = null;
    }
    setToday() {
        this.date = new Date();
    }

    
}