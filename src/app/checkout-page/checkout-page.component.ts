import { Component, OnInit } from '@angular/core';
import Product from '../Product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

class cartItem {
  product!: Product
  count!: number
}

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

 
  products: Array<cartItem> = []
  price = 0;


  constructor(private productServ: ProductService, private router : Router) { }

  ngOnInit(): void {
    this.products = this.productServ.getCart();
    this.updatePrice()
    console.log(this.products);

  }

  onRemove(i:number) :void{
    if (this.products[i].count == 1) {
      this.productServ.removeItemFromCart(i)
    } else {
      this.products[i].count--
      this.productServ.updateCart(this.products)

    }
    this.products = this.productServ.getCart();
    this.updatePrice()
  }

  
  onAdd(i:number) :void{
    this.products[i].count++
    this.productServ.updateCart(this.products)
    this.updatePrice()
  }

  updatePrice() {
    for (let item of this.products) {
      this.price += Math.round((item.product.price * item.count) * 100) / 100
    }
  }


  OnPayBtn() {
    const queryParams = {
      price :  this.price
    };
    const queryParamsString = JSON.stringify(queryParams);
    const encodedQueryParamsString = encodeURIComponent(queryParamsString);
  
    this.router.navigate(['/pay'], { queryParams: { finalPrice: encodedQueryParamsString } });
  }

  OnShopMoreBtn(){
    this.router.navigate(['/products']);
  }

}
