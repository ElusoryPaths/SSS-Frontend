import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Product from '../Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy {
  querySub: Subscription[] = [];
  featured: Array<Product> = [];
  products: Array<Product> = [];
  error: string = "";
  constructor(private product: ProductService) { }

  ngOnDestroy(): void {
    this.querySub.forEach((subscription) => subscription.unsubscribe());
  }
  
  ngOnInit(): void {
    this.querySub.push(
      this.product.getRecentProducts().subscribe(
        (success) => {
          this.products = success;
          console.log("Successfully pulled recent products...")
          console.log(success);

          for(let i=0;i<5;i++) {
            this.featured.push(this.products[i]); 
          }

        },
        (err) => {
          console.log("could not pull recent products...")
          console.error(err);
        }
      )
    )
    
  }

}
