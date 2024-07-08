import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selectedFile!:File;
  ngOnInit(): void {
    this.getAllCategories();
    this.productForm = this.fb.group({
      title: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      categoryId: ['', Validators.compose([Validators.required])],
      imagePath: ['', Validators.compose([Validators.required])],
    });
  }
  constructor(
    private categoryService: CategoryService,
    private productService:ProductService,
    private fb: FormBuilder
  ) {}
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
  onSelectedFile(event:any){
    this.selectedFile=event?.target.files[0]
  }
  onSubmit() {
    if(this.productForm.valid){
      const form=new FormData();
      form.append('title',this.productForm.get('title')?.value)
      form.append('description',this.productForm.get('description')?.value)
      form.append('price',this.productForm.get('price')?.value)
      form.append('categoryId',this.productForm.get('categoryId')?.value)
      form.append('imagePath',this.selectedFile)
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
      this.productForm.reset()
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Something Went Wrong",
      });
    }
  }
}
