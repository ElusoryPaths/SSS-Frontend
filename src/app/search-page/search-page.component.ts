import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';
import Product from '../Product';
import { ProductService } from '../product.service';
import { HttpParams } from '@angular/common/http';
import { query } from '@angular/animations';



@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  prodTitle : string = "";
  currentUrl : string = "";
  searchValue : string = "";


  allProducts : Array<Product> = [];
  foundProducts : Array<Product> = [];
  MensCollectionProducts : Array<Product> = [];
  WomensCollectionProducts : Array<Product> = [];
  ElectronicsCollectionProducts : Array<Product> = [];
  JeweleryCollectionProducts : Array<Product> = [];
  SortedProducts : Array<Product> = [];
  CatProducts: Array<Product> = [];
  

  categoryName : string = "";
  showCategoryResult: boolean = false;
  showResult : boolean = false;
  showNotFound : boolean = false;




  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.prodTitle = params['query'];
      console.log(this.prodTitle);
      console.log("first function");
    });

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {

        this.currentUrl = event.url;
        const urlTree = this.router.parseUrl(this.currentUrl);
        console.log("The value from search button in search page: " + urlTree.queryParams['query']);
        this.searchValue = urlTree.queryParams['query'];
        this.foundProducts = [];
        this.showNotFound = false;
        this.showResult = false;
        this.onClickSearchIcon();

      }
    });
    

    this.productService.getRecentProducts().subscribe(
      (products) => {
        this.allProducts = products;
        this.foundProducts = [];
        console.log("Pulled all products in the search page");
        if (this.prodTitle != "") {
          this.findProducts(this.prodTitle);
          this.showResult = true;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }





  findProducts(Title: string): void {
    console.log("inside findProducts");
    this.foundProducts = [];
    this.foundProducts.length = 0;
    let singleProd: Product;
    for (let i = 0; i < this.allProducts.length; i++) {

      if (this.allProducts[i].title.toLowerCase().split(' ').slice(0, 3).join(' ').includes(Title.toLocaleLowerCase().split(' ').slice(0, 3).join(' '))) {
        singleProd = this.allProducts[i];
        this.foundProducts.push(singleProd);
      }
    }
    console.log("***Pushed to Found Products");
    console.log(this.foundProducts);

    if (this.foundProducts.length == 0) {
      this.showNotFound = true;
    }
  }


  loadByCategory(name:string) : void
  {
    this.CatProducts = [];
    this.CatProducts.length = 0;
    if(this.foundProducts.length > 0)
    {
      for(let i = 0; i < this.foundProducts.length; i++)
      {
        if(this.foundProducts[i].category == name)
        {
          this.CatProducts.push(this.foundProducts[i]);
        }
      }
    }
  }

  onClickSearchIcon(): void {
    this.showNotFound = false;
    this.showResult = false;
    this.foundProducts = [];
    this.foundProducts.length = 0;

    if (this.searchValue != "")
    {
      this.findProducts(this.searchValue);
      this.showResult = true;
    }



  }

  onClickClearIcon(): void {
    this.showNotFound = false;
    this.showResult = false;
    this.showCategoryResult = false;

    this.foundProducts = [];
    this.foundProducts.length = 0;
    this.MensCollectionProducts = [];
    this.WomensCollectionProducts = [];
    this.ElectronicsCollectionProducts  = [];
    this.JeweleryCollectionProducts  = [];
    this.SortedProducts = [];

    this.prodTitle = "";
    this.searchValue = "";

  }

  categoryClicked(event:any)
  { 
    this.categoryName = event.target.innerText;
    this.showCategoryResult = true;
    this.showResult = false;
    this.showNotFound = false;
    this.CatProducts = [];

    if(this.categoryName == "Mens Collection")
    {
      this.loadByCategory("men's clothing");
    }
    if(this.categoryName == "Womens Collection")
    {
      this.loadByCategory("women's clothing");
    }
    if(this.categoryName == "Electronics")
    {
      this.loadByCategory("electronics");
    }
    if(this.categoryName == "Jewelery")
    {
      this.loadByCategory("jewelery");
    }

    if(this.foundProducts.length == 0)
    {
      this.showCategoryResult = true;
      this.showResult = false;
      this.showNotFound = true;
    }
  }

  sortingByClicked(event:any)
  {
    if(this.foundProducts.length > 0)
    {
      this.showCategoryResult = false;
      this.showResult = true;
      this.showNotFound = false;
      let sortByName : string = event.target.value;


      if(sortByName == "PlowHigh")
      {
        this.foundProducts.sort((a,b)=>a.price - b.price);
        console.log("Inside low to high")
  
      }
      if(sortByName == "PhighLow")
      {
        this.foundProducts.sort((a,b)=>b.price - a.price);
      }
      if(sortByName == "RlowHigh")
      {
        this.foundProducts.sort((a,b)=>a.rating.count - b.rating.count);
      }
      if(sortByName == "RhighLow")
      {
        this.foundProducts.sort((a,b)=>b.rating.count - a.rating.count);
      }

      
    }

    else{
      this.showCategoryResult = false;
      this.showResult = false;
      this.showNotFound = true;
    }


  }


}
