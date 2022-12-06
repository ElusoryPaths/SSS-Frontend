import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import Product from '../Product';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  @Input() products!: Array<Product>;

  
  constructor(config: NgbCarouselConfig) { 
    // customize default values of carousels used by this component tree
		config.interval = 5000;
		config.wrap = true;
		config.keyboard = false;
		config.pauseOnHover = true;
  }

  ngOnInit(): void {
    
  }

}
