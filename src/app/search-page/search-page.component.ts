import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Product from '../Product';
import { ProductService } from '../product.service';



@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  prodTitle : string = "";
  searchValue : string = "";
  allProducts : Array<Product> = [];
  foundProducts : Array<Product> = [];
  showResult !: boolean;

  constructor(private route : ActivatedRoute, private productService : ProductService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.prodTitle = params['query'];
      console.log(this.prodTitle);
      console.log("first function");
    });

    this.productService.getRecentProducts().subscribe(
      (products) =>
      {
        this.allProducts = products;
        console.log("Pulled all products in the search page");
        if(this.prodTitle != "")
        {
          this.findProducts(this.prodTitle);
          this.showResult = true;
        }  


      },
      (err)=>
      {
        console.log(err);
      }
    );


    

    


  }

  findProducts(Title:string) : void
  {
    console.log("inside findProducts")
    let singleProd : Product;
    for(let i = 0; i < this.allProducts.length; i++)
    {
      
      if(this.allProducts[i].title.toLowerCase().split(' ').slice(0,3).join(' ').includes(Title.toLocaleLowerCase().split(' ').slice(0,3).join(' ')))
      {
        singleProd = this.allProducts[i];
        console.log(singleProd);
        this.foundProducts.push(singleProd);
      }
    }
  }

  onClickSearchIcon(): void
  {
    if(this.searchValue != "")
      this.findProducts(this.searchValue);
      this.showResult = true;
    
  }

  onClickClearIcon() : void
  {
    this.showResult = false;
    this.foundProducts = [];
    this.prodTitle = "";
    this.searchValue = "";
  }


}
