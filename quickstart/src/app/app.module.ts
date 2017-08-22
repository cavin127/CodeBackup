import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { EventListComponent }  from './events/event-list.component';
import { collapsibleWellComponent }  from './common/collapsible-well.component';
import { simpleModalComponent }  from './common/simple-modal.component';
import { sessionListComponent }  from './events/event-details/session-list.component';

import { EventDetailsComponent }  from './events/event-details/event-details.component';
import { Error404Component }  from './errors/404.component';
import { createEventComponent }  from './events/create-event.component';
import { EventThumbnailComponentClass }  from './events/event-thumbnail.component';
import { NavBarComponent }  from './nav/navbar.component';
import { createSessionComponent } from './events/event-details/create-session.component';
import { EventService } from './events/shared/event.service';
import { pipeDurationComponent } from './events/shared/duration-pipe';
import { EventRouteActivator } from './events/event-details/event-route-activator.service';
import { ToastService } from './common/toastr.service';

import { JQ_TOKEN } from './common/jquery.service';
import { modalTiggerDirective } from './common/modal-trigger.directive';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { appRoutes } from './routes';
import { AuthService } from './user/auth.service';
import { DatepickerModule } from 'ngx-bootstrap';
import { TypeAheadModule } from 'ng2-bootstrap-typeahead/src/typeahead.module';
declare let jQuery:Object;

@NgModule({
  imports:      [ HttpModule , BrowserModule ,RouterModule.forRoot(appRoutes),FormsModule,ReactiveFormsModule,DatepickerModule.forRoot(),TypeAheadModule],
  declarations: [ AppComponent,
                  EventListComponent,
                  EventThumbnailComponentClass,
                  EventDetailsComponent,
                  createEventComponent,
                  NavBarComponent,
                  Error404Component,
                  createSessionComponent,
                  sessionListComponent,
                  collapsibleWellComponent,
                  pipeDurationComponent,
                  simpleModalComponent,
                  modalTiggerDirective
                ],
  providers: [ EventService,
  ToastService ,
  EventRouteActivator,
  AuthService,
  {
    provide:'canDeactivateCreateEvent',
    useValue : checkDirtyState

  },

  {
    provide:JQ_TOKEN,
    useValue:jQuery
  },
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

function checkDirtyState(component:createEventComponent){

  if(component.isDirty)
  
    return window.confirm("Do you really want to cancel without saving event??")
  
  return true;
}