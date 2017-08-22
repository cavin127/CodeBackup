import { Routes } from '@angular/router'
import { EventListComponent }  from './events/event-list.component';
import { EventDetailsComponent }  from './events/event-details/event-details.component';
import { createEventComponent }  from './events/create-event.component';
import { Error404Component }  from './errors/404.component';
import { EventRouteActivator } from './events/event-details/event-route-activator.service';
import { createSessionComponent } from './events/event-details/create-session.component';

export const appRoutes:Routes= [
    {path: 'events/new' , component : createEventComponent},
    {path: 'events' , component : EventListComponent},
    {path: 'events/:id' , component : EventDetailsComponent , canActivate:[EventRouteActivator]},

    {path: 'events/session/new' , component:createSessionComponent},
    {path: '404' , component : Error404Component},
   
    {path: '' ,redirectTo:'/events',pathMatch:'full'},
    {path: 'user' , loadChildren:'app/user/user.module#UserModule'}
    
]