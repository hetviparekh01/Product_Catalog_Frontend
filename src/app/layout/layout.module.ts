import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';



@NgModule({
  declarations: [
    NavbarComponent,
    HorizontalComponent,
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class LayoutModule { }
