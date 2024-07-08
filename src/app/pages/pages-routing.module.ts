import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddCategoryComponent } from './add-category/add-category.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"product",
    pathMatch:"full"
  },
  {
    path:"product",
    component:ProductComponent
  },
  {
    path:"addproduct",
    component:AddProductComponent
  },
  {
    path:"addcategory",
    component:AddCategoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
