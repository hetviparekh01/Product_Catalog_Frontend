import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorizontalComponent } from './layout/horizontal/horizontal.component';

const routes: Routes = [
  {
    path:"",
    component:HorizontalComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path:"auth",
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
