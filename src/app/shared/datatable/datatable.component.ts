import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent {
  @Input() rowData:any;
  @Input() colDefs: any;
  gridOptions={
    rowHeight: 65,
  };
}
