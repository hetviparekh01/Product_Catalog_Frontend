import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent {
  categoryForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
  ) {}
  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.categoryService.addCategory(this.categoryForm.value).subscribe({
        next: (response: any) => {
          if (response.status) {
            Swal.fire({
              icon: 'success',
              title: response.content,
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.content,
            });
          }
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        },
      });
      this.categoryForm.reset();
    }
  }
}
