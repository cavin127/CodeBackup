import { Component,Renderer,ElementRef } from '@angular/core';
import { Router } from '@angular/router'



@Component ({
    selector: 'msw-navbar'
    ,templateUrl: 'navbar.component.html'
})

export class NavbarComponent {
    isAddClass:boolean;
    target:any
    constructor(private router:Router,private render:Renderer) {
        
    }


    goToPage(page,event)
    {  

        //alert(page); 
       //var self = this;

       //this.isAddClass = true;
       //self.target= event.currentTarget;
       this.router.navigate([page]);
       //self.render.setElementClass(self.target,"act",true);

    }
}