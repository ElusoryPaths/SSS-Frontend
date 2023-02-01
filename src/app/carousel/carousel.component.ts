import { NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import Product from '../Product';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  @Input() products!: Array<Product>;
  @Output() message:EventEmitter<any> = new EventEmitter();

  
  constructor(config: NgbCarouselConfig) { 
    // customize default values of carousels used by this component tree
		config.interval = 5000;
		config.wrap = true;
		config.keyboard = false;
		config.pauseOnHover = true;
  }

  ngOnInit(): void {
    
  }

  sendBtn1Data() :void
  {
    this.message.emit(false);
  }
  sendBtn2Data() :void
  {
    this.message.emit(true);
  }

}
