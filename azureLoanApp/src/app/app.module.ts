import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule ,JsonpModule} from '@angular/http';
import { FormsModule,ReactiveFormsModule }        from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent }  from '../home/home.component';
import { PersonalComponent }  from '../personal/personal.component';
import { NavbarComponent }  from '../navbar/navbar.component';
import { WorkComponent }  from '../work/work.component';
import { AddressComponent }  from '../address/address.component';
import { appRoutes } from './routes';
import { IonRangeSliderModule } from "ng2-ion-range-slider";


import { FormDataService }    from '../data/formData.service';

@NgModule({
  declarations: [
    AppComponent,HomeComponent,PersonalComponent,NavbarComponent,WorkComponent,AddressComponent,
    ],
  imports: [
    BrowserModule,RouterModule.forRoot(appRoutes), HttpModule,JsonpModule,
                    FormsModule,ReactiveFormsModule,IonRangeSliderModule
  ],
 
  providers: [{ provide: FormDataService, useClass: FormDataService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
