import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import Product from '../Product';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  querySub: Subscription[] = [];

  constructor(private productServ: ProductService) { }

  ngOnDestroy(): void {
    this.querySub.forEach((subscription) => subscription.unsubscribe());
  }
  
  ngOnInit(): void {
    
  }

  addToCart(product: Product) {
    this.productServ.addToCart(product)
    this.querySub.push(
      this.productServ.addToViewCart(product.id).subscribe()
    )
  }
}
