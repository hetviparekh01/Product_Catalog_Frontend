import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { CustomRendererComponent } from 'src/app/shared/custom-renderer/custom-renderer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent {
 
  categoryForm!: FormGroup;
  categoryData: any;
  categoryId!:string;
  isAdd:boolean=true;
  isUpdate:boolean=false;
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
  ) {}
  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
    });
    this.getAllCategories();
  }
  columnDefs: ColDef[] = [
    { headerName: 'Category Name', field: 'categoryName', flex: 2 },
    { headerName: 'Description', field: 'description', flex: 2 },
    {
      headerName: '',
      field: '',
      flex: 2,
      cellRenderer:CustomRendererComponent,
      cellRendererParams: {
        updateBtn:(id:string)=>this.updateContent(id),
        deleteBtn:(id:string)=>this.deleteContent(id)
      },
    },
  ];
  deleteContent(id: string) {
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
        this.categoryService.deleteCategory(id).subscribe({
          next:(response:any)=>{
            Swal.fire({
              icon: "success",
              title: response.content,
              showConfirmButton: false,
              timer: 1500
            });
            this.getAllCategories()
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
  updateContent(id: string) {
      this.getCategoryById(id);
      this.isAdd=false;
      this.isUpdate=true;
      this.categoryId=id
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
  getCategoryById(id:string){
    this.categoryService.getCategoryById(id).subscribe({
        next:(response:any)=>{
          this.categoryForm.patchValue({
            categoryName:response.content.categoryName,
            description:response.content.description
          })
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.content,
          });
        },
    })
  }
  onSubmit() {
    if (this.categoryForm.valid) {
      if(this.isAdd){
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
      }else{
        this.categoryService.updateCategory(this.categoryId,this.categoryForm.value).subscribe({
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
      }
      this.getAllCategories()
      this.categoryForm.reset();
    }else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something Went Wrong',
      });
    }
  }
}
