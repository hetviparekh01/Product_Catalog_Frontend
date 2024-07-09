import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { RouterModule } from '@angular/router';
import { DatatableComponent } from './datatable/datatable.component';
import { AgGridAngular } from 'ag-grid-angular';
import { CustomRendererComponent } from './custom-renderer/custom-renderer.component';



@NgModule({
  declarations: [
    CardComponent,
    DatatableComponent,
    CustomRendererComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AgGridAngular
  ],
  exports:[
    CardComponent,
    DatatableComponent,
    CustomRendererComponent
  ]
})
export class SharedModule { }
