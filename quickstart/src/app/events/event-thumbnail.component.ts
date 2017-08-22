import { Component ,Input , Output , EventEmitter } from '@angular/core';

@Component({
    selector:'event-thumbnail',
    template:`
            `
    
})

export class EventThumbnailComponentClass{

    @Input() event:any;
    
    someproperty:any = "LIST OF PRODUCTS";

    logFoo(){

        console.log("Here I AM");
    }

    
}