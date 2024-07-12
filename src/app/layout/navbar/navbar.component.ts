import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { UserServiceService } from 'src/app/core/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userData: any;
  role: string = this.ls.getRole() as string;
  name: string = this.ls.getName() as string;
  selectedFile!: File;
  temporaryURL!:string;
  constructor(
    private ls: LocalstorageService,
    private route: Router,
    private userService: UserServiceService
  ) {}
  ngOnInit() {
    this.getParticualrUser();
     
  }
  onSelectedFile(event: any) {
    this.selectedFile = event?.target.files[0];
  }
  // loadFile(profile: any) {
  //  let reader=new FileReader();
  //  console.log(profile);
  //  reader.onload=()=>{
  //   let imageUpload=profile.id;
  //   imageUpload.src=reader.result
  //  }
  //   reader.readAsDataURL(profile);
  // }
  loadFile(event: any, previewImage: HTMLImageElement) {
    this.onSelectedFile(event);
    const reader = new FileReader();
    reader.onload = () => {
      previewImage.src = reader.result as string;
      this.temporaryURL=previewImage.src
    };
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }
  resetPreviewImage() {
     this.temporaryURL = `http://localhost:3000/public/${this.userData?.profileImage}`;
  }

  UpdateProfile() {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('profileImage', this.selectedFile);
    }
    this.userService.updateParticularUser(formData).subscribe({
      next: (response: any) => {
        Swal.fire({
          icon: 'success',
          title: response.content,
          showConfirmButton: false,
          timer: 1500,
        });
        this.getParticualrUser();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.content,
        });
      },
    });
  }
  getParticualrUser() {
    this.userService.getParticularUser().subscribe({
      next: (response) => {
        this.userData = response.content;
        this.temporaryURL = `http://localhost:3000/public/${this.userData?.profileImage}`;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.content,
        });
      },
    });
  }
  logOut() {
    this.ls.clearLocalstorage();
    this.route.navigate(['/auth/login']);
    Swal.fire({
      icon: 'success',
      title: 'USER LOGGED OUT SUCCESSFULLY',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
