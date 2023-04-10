import { Component, OnInit } from '@angular/core';
import Product from '../Product';
import { ProductService } from '../product.service';

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
  tax = 0;
  total = 0;

  constructor(private productServ: ProductService) { }

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
      this.price+= item.product.price * item.count
    }
    this.tax = Math.round((this.price * 0.13) * 100) / 100
    this.total = this.price + this.tax
  }

}
