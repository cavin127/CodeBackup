import { Component , Output , EventEmitter} from '@angular/core'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'


@Component({
    templateUrl :'app/user/login.component.html',
    styles:[`
        em{float:right;color:#e05c65}
    `]

})

export class LoginComponent{
    

    

    constructor(private authService:AuthService,private router:Router){

    }

    login(formValues:any){
        localStorage.setItem("firstname", formValues.userName);
        //console.log(localStorage.getItem("firstname"));

        if (localStorage.getItem("firstname") != null) {
            document.getElementById("test").innerHTML = localStorage.getItem("firstname");
        }


        this.authService.loginUser(formValues.userName,formValues.password)
        this.router.navigate(['events'])
    }
    
}