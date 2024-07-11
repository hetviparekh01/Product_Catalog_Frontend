import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup;
  selectedFile!:File;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      role: ['', Validators.compose([Validators.required])],
      profileImage:['',Validators.compose([Validators.required])]
    })
  }
  onSelectedFile(event:any){
    this.selectedFile=event.target.files[0]
  }
  onSubmit() {
    if (this.signupForm.valid) {
       const form = new FormData();
       form.append('name', this.signupForm.get('name')?.value);
       form.append('email', this.signupForm.get('email')?.value);
       form.append('password', this.signupForm.get('password')?.value);
       form.append('role', this.signupForm.get('role')?.value);
       form.append('profileImage', this.selectedFile);
      this.authService.signup(form).subscribe({
        next: (response: any) => {
          if(response.status){
            Swal.fire({
              icon: "success",
              title: response.content,
              showConfirmButton: false,
              timer: 1500
            });
          }else{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.content,
            });
          }
          this.router.navigate(['/auth/login'])
        },
        error: (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      })
      this.signupForm.reset()
    }
  }
}
