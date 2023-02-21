import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
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

  id: string = "";
  product!: Product;

  constructor(private route: ActivatedRoute, private productServ: ProductService, private router: Router) { }

  ngOnDestroy(): void {
    this.querySub.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.querySub.push(
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.id = params.get('id') || ""
      })
    )
    if (this.id) {
      this.querySub.push(
        this.productServ.getProductById(this.id).subscribe({
          next: (success) => {
            if (success.message) {
              this.router.navigate(['**'], { skipLocationChange: true })
            } else {
              this.product = success;
            }
            
          },
          error: (error) => { 
            console.error(error) 
          }
        })
      )
    }
  }
}