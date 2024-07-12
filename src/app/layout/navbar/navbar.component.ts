import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { UserServiceService } from 'src/app/core/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userData:any;
  role:string=this.ls.getRole() as string;
  name:string=this.ls.getName() as string
  constructor(private ls:LocalstorageService,private route:Router,private userService:UserServiceService){}
  ngOnInit() {
    this.getParticualrUser()
  }

  getParticualrUser(){
    this.userService.getParticularUser().subscribe({
        next:(response)=>{
          this.userData=response.content
        },
        error:(error)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.content,
          })
        }
    })
  }

  logOut() {
    this.ls.clearLocalstorage()
     this.route.navigate(['/auth/login'])
     Swal.fire({
      icon: 'success',
      title: "USER LOGGED OUT SUCCESSFULLY",
      showConfirmButton: false,
      timer: 1500,
    });
  }

}
