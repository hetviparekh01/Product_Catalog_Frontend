import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { ToasterMessageService } from 'src/app/core/services/toaster-message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private ls: LocalstorageService,private ts:ToasterMessageService) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          if (response.status) {
            this.ls.setToken(response.content.accessToken);
            this.ls.setRole(response.content.role);
            this.ls.setName(response.content.name);
            this.ts.showSuccess(response.content.message)
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.content,
            });
          }
          this.router.navigate(['/'])
        },
        error: (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      })
      this.loginForm.reset()
    }
  }

}
