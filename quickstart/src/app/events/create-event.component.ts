import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { EventService } from './shared/event.service';
import { DatepickerModule } from 'ngx-bootstrap';
import * as moment from 'moment';



@Component({

    templateUrl:'app/events/create-event.component.html',
     styles :[`
     em{float:right;color:#e05c65}
     .error input{background-color:#e3c3c5}
     .typeahead-input,
        .typeahead-typeahead{
            width: 250px;
            padding: 8px;
            border-radius: 5px;
        }
  `]
    
})

export class createEventComponent {

    
    isDirty:boolean = false
    constructor(private router:Router,private eventService : EventService){


    }
    cancel(){

        this.router.navigate(['events']);
    }

    saveEvent(formValues:any){
       
       this.eventService.saveEvent(formValues)
       this.isDirty = false
       this.router.navigate(['events'])

    }

    stateListData = [{ "name": "Alabama", "abbreviation": "AL" }, { "name": "Alaska", "abbreviation": "AK" }, { "name": "AmericanSamoa", "abbreviation": "AS" }, { "name": "Arizona", "abbreviation": "AZ" }, { "name": "Arkansas", "abbreviation": "AR" }, { "name": "California", "abbreviation": "CA" }, { "name": "Colorado", "abbreviation": "CO" }, { "name": "Connecticut", "abbreviation": "CT" }, { "name": "Delaware", "abbreviation": "DE" }, { "name": "DistrictOfColumbia", "abbreviation": "DC" }, { "name": "FederatedStatesOfMicronesia", "abbreviation": "FM" }, { "name": "Florida", "abbreviation": "FL" }, { "name": "Georgia", "abbreviation": "GA" }, { "name": "Guam", "abbreviation": "GU" }, { "name": "Hawaii", "abbreviation": "HI" }, { "name": "Idaho", "abbreviation": "ID" }, { "name": "Illinois", "abbreviation": "IL" }, { "name": "Indiana", "abbreviation": "IN" }, { "name": "Iowa", "abbreviation": "IA" }, { "name": "Kansas", "abbreviation": "KS" }, { "name": "Kentucky", "abbreviation": "KY" }, { "name": "Louisiana", "abbreviation": "LA" }, { "name": "Maine", "abbreviation": "ME" }, { "name": "MarshallIslands", "abbreviation": "MH" }, { "name": "Maryland", "abbreviation": "MD" }, { "name": "Massachusetts", "abbreviation": "MA" }, { "name": "Michigan", "abbreviation": "MI" }, { "name": "Minnesota", "abbreviation": "MN" }, { "name": "Mississippi", "abbreviation": "MS" }, { "name": "Missouri", "abbreviation": "MO" }, { "name": "Montana", "abbreviation": "MT" }, { "name": "Nebraska", "abbreviation": "NE" }, { "name": "Nevada", "abbreviation": "NV" }, { "name": "NewHampshire", "abbreviation": "NH" }, { "name": "NewJersey", "abbreviation": "NJ" }, { "name": "NewMexico", "abbreviation": "NM" }, { "name": "NewYork", "abbreviation": "NY" }, { "name": "NorthCarolina", "abbreviation": "NC" }, { "name": "NorthDakota", "abbreviation": "ND" }, { "name": "NorthernMarianaIslands", "abbreviation": "MP" }, { "name": "Ohio", "abbreviation": "OH" }, { "name": "Oklahoma", "abbreviation": "OK" }, { "name": "Oregon", "abbreviation": "OR" }, { "name": "Palau", "abbreviation": "PW" }, { "name": "Pennsylvania", "abbreviation": "PA" }, { "name": "PuertoRico", "abbreviation": "PR" }, { "name": "RhodeIsland", "abbreviation": "RI" }, { "name": "SouthCarolina", "abbreviation": "SC" }, { "name": "SouthDakota", "abbreviation": "SD" }, { "name": "Tennessee", "abbreviation": "TN" }, { "name": "Texas", "abbreviation": "TX" }, { "name": "Utah", "abbreviation": "UT" }, { "name": "Vermont", "abbreviation": "VT" }, { "name": "VirginIslands", "abbreviation": "VI" }, { "name": "Virginia", "abbreviation": "VA" }, { "name": "Washington", "abbreviation": "WA" }, { "name": "WestVirginia", "abbreviation": "WV" }, { "name": "Wisconsin", "abbreviation": "WI" }, { "name": "Wyoming", "abbreviation": "WY" }];
  typeAheadSetup = {
    customTemplate: '<div> {{item.name}}</div>',
    //    timeDelay: number; 
    // type: 'static', //static || dynamic.  default value is dynamic 
    placeHolder: 'State name',
    textPrperty: 'name',
    valueProperty: 'abbreviation',
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