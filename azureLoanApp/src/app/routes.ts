import { Routes } from '@angular/router'
import { HomeComponent }  from '../home/home.component';
import { PersonalComponent }  from '../personal/personal.component';
import { WorkComponent }  from '../work/work.component';
import { AddressComponent }  from '../address/address.component';


export const appRoutes:Routes= [
    {path: 'home' , component : HomeComponent},
    {path: 'quote' , component : PersonalComponent},
    {path: 'offer' , component : WorkComponent},
    {path: 'address' , component : AddressComponent},
    
    
    {path: '' ,redirectTo:'/home',pathMatch:'full'},
    
    
]