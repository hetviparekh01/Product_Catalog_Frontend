import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  categoryData: any;
  productForm!: FormGroup;
  selectedFile!: File;
  productId = this.activatedRoute.snapshot.paramMap.get('id') as string;
  isAdd: boolean = true;
  isUpdate: boolean = false;
  ngOnInit(): void {
    this.getAllCategories();
    this.productForm = this.fb.group({
      title: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      categoryId: ['', Validators.compose([Validators.required])],
      imgage:['']
    });
    if (this.productId) {
      this.getProductById();
      this.isAdd = false;
      this.isUpdate = true;
    }
    this.updatePasswordValidators();
  }
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {};

  getProductById() {
    this.productService.getProductById(this.productId).subscribe({
      next: (response) => {
        this.productForm.patchValue({
          title: response.content.title,
          description: response.content.description,
          price: response.content.price,
          categoryId : response.content.categoryId
        });
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
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.categoryData = response.content;
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
  onSelectedFile(event: any) {
    this.selectedFile = event?.target.files[0];
  }
  updatePasswordValidators() {
    const imagePathControl = this.productForm.get('imagePath');
    if (this.isAdd) {
      imagePathControl?.setValidators([
        Validators.required,
      ]);
    } else {
      imagePathControl?.clearValidators();
    }
    imagePathControl?.updateValueAndValidity();
  }
  onSubmit() {
    if (this.productForm.valid) {
      const form = new FormData();
      form.append('title', this.productForm.get('title')?.value);
      form.append('description', this.productForm.get('description')?.value);
      form.append('price', this.productForm.get('price')?.value);
      form.append('categoryId', this.productForm.get('categoryId')?.value);
      form.append('imagePath', this.selectedFile);
      if (this.isAdd) {
        this.productService.addProduct(form).subscribe({
          next: (response: any) => {
            Swal.fire({
              icon: 'success',
              title: response.content,
              showConfirmButton: false,
              timer: 1500,
            });
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.error.content,
            });
          },
        });
      }else{
        this.productService.updateProduct(this.productId,form).subscribe({
          next: (response: any) => {
            Swal.fire({
              icon: 'success',
              title: response.content,
              showConfirmButton: false,
              timer: 1500,
            });
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

      this.productForm.reset();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something Went Wrong',
      });
    }
  }
}
