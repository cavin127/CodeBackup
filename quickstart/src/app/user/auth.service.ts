import { Injectable } from '@angular/core'
import { IUser } from './user.model'

@Injectable() 

export class AuthService{
    currentUser:IUser
    sessFname:any
    loginUser(userName:string,password:string){

        localStorage.setItem("firstname",userName);
        this.currentUser={
            id:1,
            userName:userName,
            firstName:userName,
            lastName:'Papa'
            

        }
        this.sessFname = localStorage.getItem('firstname');
        

    }
    isAuthenticated(){
            //console.log(this.currentUser.firstName);
            return !! this.currentUser;
        }

    updateCurrentUser(firstName:string,lastName:string){
            this.currentUser.firstName=firstName;
            this.currentUser.lastName=lastName

    }

    sessionFname(){


    }
}