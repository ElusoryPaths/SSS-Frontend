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
        this.loadByCategory();
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

  loadByCategory() : void
  {
    for(let i = 0; i < this.allProducts.length; i++)
    {
      if(this.allProducts[i].category == "men's clothing")
      {
        this.MensCollectionProducts.push(this.allProducts[i]);
      }
      if(this.allProducts[i].category == "women's clothing")
      {
        this.WomensCollectionProducts.push(this.allProducts[i]);
      }
      if(this.allProducts[i].category == "electronics")
      {
        this.ElectronicsCollectionProducts.push(this.allProducts[i]);
      }
      if(this.allProducts[i].category == "jewelery")
      {
        this.JeweleryCollectionProducts.push(this.allProducts[i]);
      }
    }
  }

  loadByCategory() : void
  {
    for(let i = 0; i < this.allProducts.length; i++)
    {
      if(this.allProducts[i].category == "men's clothing")
      {
        this.MensCollectionProducts.push(this.allProducts[i]);
      }
      if(this.allProducts[i].category == "women's clothing")
      {
        this.WomensCollectionProducts.push(this.allProducts[i]);
      }
      if(this.allProducts[i].category == "electronics")
      {
        this.ElectronicsCollectionProducts.push(this.allProducts[i]);
      }
      if(this.allProducts[i].category == "jewelery")
      {
        this.JeweleryCollectionProducts.push(this.allProducts[i]);
      }
    }
  }

  findProducts(Title: string): void {
    console.log("inside findProducts")
    let singleProd: Product;
    for (let i = 0; i < this.allProducts.length; i++) {

      if (this.allProducts[i].title.toLowerCase().split(' ').slice(0, 3).join(' ').includes(Title.toLocaleLowerCase().split(' ').slice(0, 3).join(' '))) {
        singleProd = this.allProducts[i];
        console.log(singleProd);
        this.foundProducts.push(singleProd);
      }
    }
    if (this.foundProducts.length == 0) {
      this.showNotFound = true;
    }
  }

  onClickSearchIcon(): void {
    if (this.searchValue != "")
      this.findProducts(this.searchValue);
    this.showResult = true;

  }

  onClickClearIcon(): void {
    this.showNotFound = false;
    this.showResult = false;
    this.foundProducts = [];
    this.prodTitle = "";
    this.searchValue = "";

  }

  categoryClicked(event:any)
  { 
    this.categoryName = event.target.innerText;
    this.showCategoryResult = true;
    this.showResult = false;
    this.showNotFound = false;
    this.foundProducts = [];
    this.foundProducts.length = 0;

    if(this.categoryName == "Mens Collection")
    {
      this.foundProducts = this.MensCollectionProducts;
      console.log(this.foundProducts);
    }
    if(this.categoryName == "Womens Collection")
    {
      this.foundProducts = this.WomensCollectionProducts;
      console.log(this.foundProducts);
    }
    if(this.categoryName == "Electronics")
    {
      this.foundProducts = this.ElectronicsCollectionProducts;
    }
    if(this.categoryName == "Jewelery")
    {
      this.foundProducts = this.JeweleryCollectionProducts;
    }
  }

  sortingByClicked(event:any)
  {
    this.foundProducts = [];
    this.foundProducts.length = 0;
    this.foundProducts = this.allProducts;
    this.showCategoryResult = true;
    this.showResult = false;
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


}
