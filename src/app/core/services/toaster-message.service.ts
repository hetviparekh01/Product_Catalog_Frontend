import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterMessageService {

  constructor(private ts:ToastrService) { }
  showSuccess(message:string){
    this.ts.success(message)
  }
}

