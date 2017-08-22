import { Injectable } from '@angular/core'

declare let toastr:any

@Injectable()
export class ToastService{
    success(message:string,title:string){
        toastr.success(message,title);
    }

}