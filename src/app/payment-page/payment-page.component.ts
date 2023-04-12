import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router} from '@angular/router';

import Product from '../Product';

class cartItem {
  product!: Product
  count!: number
}

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})


export class PaymentPageComponent implements OnInit {
  Totalprice = 0;
  showAlert = false;
  constructor(private productService : ProductService, private route : ActivatedRoute, private router : Router) {}

  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      const data = JSON.parse(params['total']);
      this.Totalprice = data;
      console.log(this.Totalprice);
    })
  }

  cancelBtn()
  {
    this.router.navigate(['/']);
    this.showAlert = false;
  }

  placeOrder()
  {
    this.showAlert = true;
  }

}
