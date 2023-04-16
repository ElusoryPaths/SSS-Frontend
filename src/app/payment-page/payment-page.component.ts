import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
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
  product : Array<cartItem> = [];
  Price !: any;

  constructor(private productService : ProductService, private route : ActivatedRoute, private router : Router, private http : HttpClient) {}


  ngOnInit(): void {

    

    this.route.queryParams.subscribe(params => {
      const encodedQueryParamsString = params['finalPrice'];
      const queryParamsString = decodeURIComponent(encodedQueryParamsString);
      if (queryParamsString) {
        this.Price =  JSON.parse(queryParamsString).price;
         
        this.product = this.productService.getCart();

      }
    });
  }

  cancelBtn()
  {
    this.router.navigate(['/']);
  }

  placeOrder()
  {
    const successURL = window.location.origin + "/success";
    const cancelURL = window.location.origin + "/checkout";
    
    this.http.post('http://localhost:3000/stripe-checkout',{  finalProducts: this.product, successUrl:successURL, cancelUrl: cancelURL }).subscribe((msg:any)=>{
      window.location.href = msg.url;

    })
  }
  

  



}
