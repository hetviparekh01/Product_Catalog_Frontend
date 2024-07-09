import { Component, OnInit } from '@angular/core';
import { every } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  queryParams:any={};
  contentData: any;
  categoryData: any;
  ngOnInit(): void {
    this.getAllProduct();
    this.getAllCategories();
  }
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}
  fileterCategory(categoryName:any) {
    this.queryParams={...this.queryParams,category:categoryName.value}
    this.productService.getAllProducts(this.queryParams).subscribe({
      next: (response) => {
        this.contentData = response.content;
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
  filterSearch(_t13: HTMLInputElement) {
    this.queryParams={...this.queryParams,search:_t13.value}
    this.productService.getAllProducts(this.queryParams).subscribe({
      next: (response) => {
        this.contentData = response.content;
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
  deleteContent(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe({
          next:(response:any)=>{
            Swal.fire({
              icon: "success",
              title: response.content,
              showConfirmButton: false,
              timer: 1500
            });
            this.getAllProduct()
          },
          error:(error)=>{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text:error.error.content, 
            });
          }
        })
      }
    });
  }
  getAllProduct() {
    this.productService.getAllProducts(this.queryParams).subscribe({
      next: (response) => {
        this.contentData = response.content;
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
}
