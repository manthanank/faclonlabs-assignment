import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  //@Input() public parentData: any;
  @Input('parentData') public name: any;
  @Output() public childEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  fireEvent() {
    this.childEvent.emit('Hey')
  }
}
