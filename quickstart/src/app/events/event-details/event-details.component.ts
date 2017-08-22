import { Component } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute,Params } from '@angular/router';
import { ISession } from '../shared/event.model'
@Component({
    templateUrl : '/app/events/event-details/event-details.component.html',
    styles:[
        `.image-height{height:100px}
        a{cursor:pointer;}
        .decorate{padding:0px 10px 15px 5px}
        `
     ]
})
export class EventDetailsComponent{
    event:any
   
    addMode:boolean
    filterBy:string = 'all'
    sortBy:string = 'voters'
    
    constructor(private eventService : EventService,private route :ActivatedRoute)
    {
        
    }
    ngOnInit(){

        // this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);   

        this.route.params.forEach((params:Params) =>{

            this.event = this.eventService.getEvent(+params['id']);
            console.log(this.event); 
            this.addMode= false;
        })

    }

    addSession(){

        this.addMode = true
    }
     
    saveNewSession(session:ISession){
       
        const nextId =5;
        session.id = nextId+1;
        console.log(session);
        this.event.sessions.push(session);
        this.eventService.updateEvent(this.event);
        this.addMode=false;

        

    }
}