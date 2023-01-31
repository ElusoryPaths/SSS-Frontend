import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Subscription } from 'rxjs';
import Product from '../Product';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  querySub: Subscription[] = [];

  id: string | null = "";
  product!: Product;

  constructor(private route: ActivatedRoute, private productServ: ProductService) { }

  ngOnDestroy(): void {
    this.querySub.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.querySub.push(
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.id = params.get('id')
      })
    )
    if (this.id) {
      this.querySub.push(
        this.productServ.getProductById(this.id).subscribe((prod: Product) => {
          this.product = prod;
        })
      )
    }
  }
}
