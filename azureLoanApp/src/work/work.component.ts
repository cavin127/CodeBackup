import { Component, OnInit,Input ,ViewChild,Renderer }   from '@angular/core';
import { Personal }            from '../data/formData.model';
import { FormDataService }     from '../data/formData.service';
import { Router } from '@angular/router'
import {IonRangeSliderComponent} from "ng2-ion-range-slider";

@Component ({
    selector:     'mt-wizard-work'
    ,templateUrl: 'work.component.html'
})

export class WorkComponent implements OnInit {
    addMode:boolean;
    addMode1:boolean;
    @ViewChild('advancedSliderElement') advancedSliderElement: IonRangeSliderComponent;

     @ViewChild('advancedSliderElement1') advancedSliderElement1: IonRangeSliderComponent;
   
    advancedSlider = {name: "Advanced Slider", onUpdate: undefined, onFinish: undefined};
    advancedSlider1 = {name: "Advanced Slider", onUpdate: undefined, onFinish: undefined};
    
    title = 'What do you do?';
    workType: string;
    form: any;
    quoteData:any;
    quoteDataFromApi:any
     interestRate:number
     emi:number
     applicationDataGet:any
     error:any
    constructor(private formDataService: FormDataService,private router:Router,private render:Renderer) {
       
    }

    
    ngOnInit() {

        
        this.quoteData = localStorage.getItem('getQuoteData');
        
        let obj = JSON.parse(this.quoteData);
        this.interestRate = obj.interestRate;
        this.emi = obj.monthlyEMI;
        //console.log(obj.quoteID);

       if(obj.quoteID != null)
       {
           console.log("quote"+obj.quoteID);
          this.formDataService.getApplicationData(obj.quoteID)
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
        
        /*this.formDataService.getQuoteApi(this.quoteData)
        .subscribe(
         data=> {
      this.quoteDataFromApi = JSON.stringify(data);
      //console.log(this.quoteDataFromApi);
      
      this.interestRate = data[0]['interestRate'];
      this.emi = data[0]['monthlyEMI'];
    }); */
}

       
    rangeValueChanged1(event, start:any, end:any) {
    var start_el = this.getElement1(start);
    var end_el = this.getElement1(end);
    start_el.innerHTML = event.startValue;
    end_el.innerHTML = event.endValue;
}

getElement1(data){
    if (typeof(data)=='string') {
        return document.getElementById(data);
    }
    if (typeof(data)=='object' && data instanceof Element) {
        return data;
    }
    return null;
}

rangeValueChanged(event, start:any, end:any) {
    var start_el = this.getElement(start);
    var end_el = this.getElement(end);
    start_el.innerHTML = event.startValue;
    end_el.innerHTML = event.endValue;
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
    save(form: any) {
        if (!form.valid) 
            return;
        
        //this.formDataService.setWork(this.workType);
    }

    saveForm(){
        this.router.navigate(['address'])

    }


     update(slider, event) {
    console.log("Slider updated: " + slider.name);
    slider.onUpdate = event;
    this.addMode=true;
  }

  finish(slider, event) {
    console.log("Slider finished: " + slider.name);
    slider.onFinish = event;
  }

  setAdvancedSliderTo(from, to) {
    this.advancedSliderElement.update({from: from, to:to});
  }


    update1(slider, event) {
    console.log("Slider updated: " + slider.name);
    slider.onUpdate = event;
    this.addMode1=true;
  }

  finish1(slider, event) {
    console.log("Slider finished: " + slider.name);
    slider.onFinish = event;
  }

  setAdvancedSliderTo1(from, to) {
    this.advancedSliderElement1.update({from: from, to:to});
  }
}