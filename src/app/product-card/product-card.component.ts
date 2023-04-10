import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import Product from '../Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product!: Product;

  constructor(private productServ: ProductService) { }

  ngOnDestroy(): void {
  }
  
  ngOnInit(): void {
    
  }

  addToCart(product: Product) {
    this.productServ.addToCart(product)
  }
}
