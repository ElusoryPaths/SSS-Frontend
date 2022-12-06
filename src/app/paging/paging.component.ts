import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  @Input() page!:number;
  @Output() newPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onPageMinus() {
    if (this.page > 0) this.newPage.emit(this.page-1)
  }

  onPagePlus() {
    this.newPage.emit(this.page+1)
  }

}
