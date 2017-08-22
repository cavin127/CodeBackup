import { Component ,Input ,ViewChild , ElementRef , Inject} from "@angular/core"
import { JQ_TOKEN } from './jquery.service';



@Component({

    selector: 'simple-modal',
    template:` <!-- Modal -->
<div id={{elementId}} #modalContainer class="modal fade" tabindex = "-1">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">{{title}}</h4>
      </div>
      <div class="modal-body" (click) = "closeModal()">
        <ng-content></ng-content>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>`,
styles:[`
    .modal-body{

        height:250px;overflow-y:scroll;
    }
`]
})

export class simpleModalComponent {

    @Input()  title:string;
    @Input() elementId:string;
    @Input() closeOnBodyClick:string;
    @ViewChild('modalContainer') containerEl : ElementRef;


    constructor(@Inject(JQ_TOKEN) private $ : any){
       
    }
    closeModal(){

      if(this.closeOnBodyClick.toLocaleLowerCase() === "true")
      {
        this.$(this.containerEl.nativeElement).modal('hide');
      }
    }
}