import { Component, OnInit , ElementRef}   from '@angular/core';

import { Personal }            from '../data/formData.model';
import { FormDataService }     from '../data/formData.service';
import { FormControl, FormGroup , Validators} from '@angular/forms'
import { Router } from '@angular/router'


@Component ({
    selector:     'mt-wizard-personal'
    ,templateUrl: 'personal.component.html'
})

export class PersonalComponent implements OnInit {
    title = 'Get your personal loan quote in just seconds';
    personal: Personal;
    form: any;
    mouseoverlogin:any;
    quoteData:any; 

    loanInfoForm:FormGroup;
    stateList:FormControl;
    work:FormControl;
    sal:FormControl;
    loanamt:FormControl;
    loanInfoData:Personal;
    quoteDataFromApi_val:any
    error:any;
    postData:any;
    quoteId:number;
    applicationDataGet:any;

    constructor(private formDataService: FormDataService,private router:Router) {
    }

    ngOnInit() {
        //this.personal = this.formDataService.getPersonal();
        
        //console.log('Personal feature loaded!');
        this.quoteData = JSON.parse(localStorage.getItem('getQuoteData'));

        this.stateList = new FormControl();
        this.work = new FormControl();
        this.sal = new FormControl();
        this.loanamt = new FormControl();

        this.loanInfoForm = new FormGroup({
            stateList :this.stateList,
            work : this.work,
            sal : this.sal,
            loanamt: this.loanamt,
            
     })

     if(this.quoteData != null)
        {
            this.loanInfoForm.patchValue({
            stateList: this.quoteData.city,
            work : this.quoteData.employerName,
            sal : this.quoteData.salary,
            loanamt: this.quoteData.loanAmount,
            // formControlName2: myValue2 (can be omitted)
          });
          

          //console.log("quote"+this.quoteData.quoteID);
          this.formDataService.getApplicationData(this.quoteData.quoteID)
         .subscribe(
                data => {

                   //alert(data);
                    if(data != '')
                    {
                        this.applicationDataGet = JSON.stringify(data);

                         console.log("work +++"+this.applicationDataGet);
                         localStorage.setItem('applicant_data',this.applicationDataGet);
                   
                    }
                    else
                    {

                            if(data == '')
                            {

                                localStorage.removeItem('applicant_data');
                                 localStorage.removeItem('ApplicationId');
                            }
                           
                    }
                  
                   /* this.router.stateService.go('offer');*/
                },
                error => {
                    this.error = error
                    //console.log(this.error);
                });


        }

    }
    
    saveInfo(formValues) {
        this.formDataService.postQuoteInfo(formValues)
         .subscribe(
                data => {
                   this.quoteDataFromApi_val = JSON.stringify(data);
                    console.log("==========="+this.quoteDataFromApi_val);
                    localStorage.setItem('getQuoteData', this.quoteDataFromApi_val);
                    this.quoteData = JSON.parse(localStorage.getItem('getQuoteData'));
                    this.quoteId = this.quoteData.quoteID;
                    alert("Your Quote is :"+this.quoteId);
                   // console.log(this.quoteData.quoteID);
                   /* this.router.stateService.go('offer');*/
                   this.router.navigate(['offer']);
                   
                },
                error => {
                    this.error = error
                    //console.log(this.error);
                });
        
    }

    rangeValueChanged(event, start:any, end:any) {
    var start_el = this.getElement(start);
    var end_el = this.getElement(end);
   // start_el.innerText = event.startValue;
    //end_el.innerText = event.endValue;
}

getElement(data){
    if (typeof(data)=='string') {
        return document.getElementById(data);
    }
    if (typeof(data)=='object' && data instanceof Element) {
        return data;
    }
    return null;
}

     stateListData1 = [{ "name": "Mastek", "abbreviation": "AL" },{ "name": "Infosys", "abbreviation": "AL" }, { "name": "Cognizant", "abbreviation": "AL" }, { "name": "IBM", "abbreviation": "AL" }, { "name": "Hexaware", "abbreviation": "AL" }, { "name": "Atos", "abbreviation": "AL" }];
  typeAheadSetup1 = {
    customTemplate: '<div> {{item.name}}</div>',
    //    timeDelay: number; 
    // type: 'static', //static || dynamic.  default value is dynamic 
    placeHolder: 'Work Place',
    textPrperty: 'name',
    valueProperty: 'name',
    searchProperty: 'name',
    onSelect: (selectedItem: any) => { console.log(selectedItem) },
    asynchDataCall: (value: string, cb: any) => {
      let result1 = this.stateListData1.filter((item: any) => {
        return item.name.indexOf(value) !== -1;
      });
    //you can place your webservice call here 
      setTimeout(() => {
        cb(result1);
      }, 200);
    },
    //staticDataFilterkey: any; 
    //staticData: stateListData 
  }


    stateListData = [{ "name": "Avon", "abbreviation": "AL" },{ "name": "Ayrshire", "abbreviation": "AL" },{ "name": "Bedfordshire", "abbreviation": "AL" },{ "name": "Cambridgeshire", "abbreviation": "AL" },{ "name": "Ceredigion", "abbreviation": "AL" },{ "name": "Glasgow", "abbreviation": "AL" },{ "name": "Greater Manchester", "abbreviation": "AL" },{ "name": "Leeds", "abbreviation": "AL" }, { "name": "London", "abbreviation": "AL" },{ "name": "Bradford", "abbreviation": "AL" }];
  typeAheadSetup = {
    customTemplate: '<div> {{item.name}}</div>',
    //    timeDelay: number; 
    // type: 'static', //static || dynamic.  default value is dynamic 
    placeHolder: 'State name',
    textPrperty: 'name',
    valueProperty: 'name',
    searchProperty: 'name',
    onSelect: (selectedItem: any) => { console.log(selectedItem) },
    asynchDataCall: (value: string, cb: any) => {
      let result = this.stateListData.filter((item: any) => {
        return item.name.indexOf(value) !== -1;
      });
    //you can place your webservice call here 
      setTimeout(() => {
        cb(result);
      }, 200);
    },
    //staticDataFilterkey: any; 
    //staticData: stateListData 
  }

}
