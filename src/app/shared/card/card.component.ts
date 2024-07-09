import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() contentData:any;
  @Output() deleteFn=new EventEmitter<any>();
  
  constructor(private ls:LocalstorageService){}
  deleteData(contentId:string){
    this.deleteFn.emit(contentId);
  }
  role:string=this.ls.getRole() as string
}
