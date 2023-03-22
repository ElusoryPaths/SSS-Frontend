import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showAllProducts() : void
  {
    console.log("Show all prodcuts clicked");
  }
  showLatestProducts() : void
  {
    console.log("Show Latest prodcuts clicked");
  }
  showFeaturedProducts() : void
  {
    console.log("Show Featured prodcuts clicked");
  }

}
