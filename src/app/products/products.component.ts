import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Product from '../Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  querySub: Subscription[] = [];
  products: Array<Product> = [];
  featured: Array<Product> = [];
  latest: Array<Product> = [];
  showallproducts: boolean = false;
  showlatestproducts: boolean = false;
  showfeaturedproducts: boolean = false;

  p:number = 1;
  totalProduct:number = this.products.length;
  itemsPerPage: number = 3;

  constructor(private productServ: ProductService) { }

  ngOnInit(): void {
      this.querySub.push(
      this.productServ.getRecentProducts().subscribe(
        (success) => {
          this.products = success;
          console.log("Successfully pulled recent products...")
          console.log(success);

          for(let i = this.products.length - 1; i > this.products.length - 6; i--)
          {
            this.latest.push(this.products[i]);
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

  showAllProducts() : void
  {
    this.showallproducts = true;
    this.showlatestproducts = false;
    this.showfeaturedproducts = false;
  
  }
  showLatestProducts() : void
  {
    this.showallproducts = false;
    this.showlatestproducts = true;
    this.showfeaturedproducts = false;
  }
  showFeaturedProducts() : void
  {
    this.showallproducts = false;
    this.showlatestproducts = false;
    this.showfeaturedproducts = true;
  }

}
