import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';

@Component({
  selector: 'app-horizontal',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss']
})
export class HorizontalComponent {
  constructor(private ls:LocalstorageService,private route:Router){}
  role:string=this.ls.getRole() as string;
  name:string=this.ls.getName() as string
}
