import { Component, OnInit } from '@angular/core';
import Product from '../Product';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seller-dash',
  templateUrl: './seller-dash.component.html',
  styleUrls: ['./seller-dash.component.css']
})
export class SellerDashComponent implements OnInit {
  sellerProducts: Array<Product> = [];
  username: string = localStorage.getItem("username") || ""

  constructor(private productServ: ProductService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  removeProduct(id:string) {
    this.productServ.removeProduct(id).subscribe({
      next: (success) => {
        this.getProducts()
        console.log('Product deleted')
       },
      error: (error) => { console.error(error) }
    })
  }

  getProducts() {
    this.productServ.getSellerProducts(this.username).subscribe({
      next: (success) => { this.sellerProducts = success; },
      error: (error) => { console.error(error); }
    })
  }
}
