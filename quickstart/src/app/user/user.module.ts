import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { userRoutes } from './user.routes';
import { ProfileComponent } from './profile.component';
import { LoginComponent } from './login.component';


@NgModule({

    imports:[CommonModule,RouterModule.forChild(userRoutes),FormsModule,ReactiveFormsModule],
    declarations:[ProfileComponent,LoginComponent],
    
})

export class UserModule { }

