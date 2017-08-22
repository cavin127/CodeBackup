import { Component , OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service'
import { ISession } from '../events/shared/event.model'
import { EventService } from '../events/shared/event.service'
import { FormControl, FormGroup , Validators} from '@angular/forms'

@Component({

    selector:'nav-bar',
    templateUrl:'app/nav/nav.html',
    styles:[`li > a.active{color:#f94728}`]
})

export class NavBarComponent implements OnInit { 

    searchItem:string = "";
    foundSessions:ISession[];
     
   
    searchForm:FormGroup
    private searchBox:FormControl

    ngOnInit(){

        this.searchBox = 
      new FormControl('',Validators.required);

       this.searchForm = new FormGroup({
        searchBox:this.searchBox,
       
        
      })
    }
    constructor(private auth:AuthService,private eventService : EventService)
    {
        
    }
    
    searchSessions(searchItem:string)
    {
        
        if(searchItem != "")
        {
           this.eventService.searchSessions(searchItem).subscribe
           
           ((sessions:any) =>{this.foundSessions=sessions;
            console.log(this.foundSessions);   
        });
        }


    }
    
}