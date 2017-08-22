import { Component , OnInit } from '@angular/core';
import { EventService } from './shared/event.service';
import { ToastService } from '../common/toastr.service';
@Component({
    selector:'event-list',
    template : `
    <div class="jumbotron text-center">
                <h1>Angular 2 with Bootstrap</h1>
                <p>Resize this responsive page to see the effect!</p> 
             </div><hr>
              <div class="container">

               <div class="table-responsive">          
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Sr . No</th>
                            <th>Event Name</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Country</th>
                         </tr>
                        </thead>
                        <tbody class="list-cursor" *ngFor="let event of events" [routerLink] ="['/events',event.id]" >
                            <tr>
                                <td>{{event.id}}</td>
                                <td (click)="handleClickThumbnail(event.name)" >{{event.name | uppercase}}</td>
                                <td>{{event.date | date}}</td>
                                <td>{{event.price | currency:'USD':'true'}}</td>
                                <td>{{event.location.country}}</td>
                            </tr>
                        </tbody>
                    </table>
                   
                </div>
            </div>
        
    
    `,styles:[`.list-cursor{
        cursor:pointer;
    }.list-cursor:hover{
        background-color: #E7E4E3;`]
})
export class EventListComponent implements OnInit {

    events:any[]
    
    
    constructor(private eventService : EventService,private toastr : ToastService)
    {
        
    }
    ngOnInit(){

        this.events = this.eventService.getEvents();
        //console.log(this.events);
    }

    handleClickThumbnail(eventName:any)
    {
        //npmthis.toastr.success(eventName);

    }


    

}