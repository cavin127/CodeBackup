import { Component, OnInit , ElementRef}   from '@angular/core';

import { Personal }            from '../data/formData.model';
import { FormDataService }     from '../data/formData.service';
import { FormControl, FormGroup , Validators} from '@angular/forms'
import { Router } from '@angular/router'


@Component ({
    selector:     'home-screen'
    ,templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    title = 'Get your personal loan quote in just seconds';
    personal: Personal;
    form: any;
    quoteDataFromApi_val:any;
    error:any;
    quoteId:any;
    mouseoverlogin:any;
    
    constructor(private formDataService: FormDataService,private router:Router) {
    }

    ngOnInit() {
        this.personal = this.formDataService.getPersonal();
        
        console.log('Personal feature loaded!');
    }

    goToQuote(){
       
       localStorage.removeItem('getQuoteData');
        this.router.navigate(['quote'])
        
    }
    save(formValues:any) {
        
       let quote = formValues.quoteId;
        this.formDataService.getQuoteFromId(quote)
         .subscribe(
                data => {
                   this.quoteDataFromApi_val = JSON.stringify(data).substr(1,JSON.stringify(data).length-2);

                   console.log(this.quoteDataFromApi_val);
                    localStorage.setItem('getQuoteData', this.quoteDataFromApi_val);
                    this.router.navigate(['offer'])
                },
                error => {
                    this.error = error
                    //console.log(this.error);
                });
        //this.formDataService.setPersonal(this.personal);
    }

    

}
