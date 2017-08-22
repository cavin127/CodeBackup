import { Component , OnInit , Output , EventEmitter} from '@angular/core'
import { FormControl, FormGroup , Validators} from '@angular/forms'
import { Router , ActivatedRoute} from '@angular/router'

import { ISession } from '../shared/event.model'

@Component({
    selector : 'create-session',
    templateUrl:'app/events/event-details/create-session.component.html',
     styles :[`
     em{float:right;color:#e05c65}
     .error input{background-color:#e3c3c5}
     .error select{background-color:#e3c3c5}
     .error textarea{background-color:#e3c3c5}
  `]
})


export class createSessionComponent implements OnInit {

    @Output()  saveNewSession = new EventEmitter();

     constructor(private router:Router,private route:ActivatedRoute){

    }

    newSessionForm:FormGroup;
    name:FormControl;
    duration:FormControl;
    presenter:FormControl;
    level:FormControl;
    abstract:FormControl

    ngOnInit(){

        this.name = new FormControl('',Validators.required);
        this.duration = new FormControl('',Validators.required);
        this.presenter = new FormControl('',[Validators.required,Validators.maxLength(100)]);
        this.level = new FormControl('',Validators.required);
        this.abstract = new FormControl('',[Validators.required,Validators.maxLength(100)]);

        this.newSessionForm = new FormGroup({
            name :this.name,
            duration : this.duration,
            presenter : this.presenter,
            level: this.level,
            abstract : this.abstract
     })

    }

    saveSession(formValues:any){

        let session:ISession={
            id:undefined,
            name:formValues.name,
            duration:formValues.duration,
            presenter:formValues.presenter,
            level:formValues.level,
            abstract:formValues.abstract,
            voters:[]

        }
        this.saveNewSession.emit(session)
    }

    cancel(){

       
       
       
        this.router.navigate(['events'])
    }



}