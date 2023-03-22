import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Product from '../Product';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  querySub: Subscription[] = [];
  featured: Array<Product> = [];
  recent: Array<Product> = [];
  products: Array<Product> = [];
  error: string = "";
  p:number = 1;
  totalProduct:number = this.recent.length;
  itemsPerPage: number = 5;
  showProduct: boolean = false;
  constructor(private productServ: ProductService) { }

  ngOnDestroy(): void {
    this.querySub.forEach((subscription) => subscription.unsubscribe());
  }

  recieveData(data:any)
  {
    this.showProduct = data;
    console.log(data);
  }

  ngOnInit(): void {
    this.querySub.push(
      this.productServ.getRecentProducts().subscribe(
        (success) => {
          this.products = success;
          console.log("Successfully pulled recent products...")
          console.log(success);

          for(let i = this.products.length - 1; i > this.products.length - 6; i--)
          {
            this.recent.push(this.products[i]);
          }
          for(let i = this.products.length - 1; i > this.products.length - 16; i--)
          {
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
