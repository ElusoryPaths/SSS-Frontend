import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import Product from '../Product';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product!: Product;

  constructor() { }

  ngOnDestroy(): void {
  }
  
  ngOnInit(): void {
    
  }

}
