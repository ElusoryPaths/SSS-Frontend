import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Product from '../Product';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-search-button',
  templateUrl: './search-button.component.html',
  styleUrls: ['./search-button.component.css']
})
export class SearchButtonComponent implements OnInit {

  public SearchValue : string = "";

  constructor(private http : HttpClient, private router : Router) {
  }

  ngOnInit(): void {
  };

  searchProduct(Title : string) : void
  {
    const productTitle = Title;
    const data = {
      query: productTitle
    };
    const apiUrl = "https://sss-backend.vercel.app/search";



    this.http.post(apiUrl,data).subscribe((response:any)=>
    {
      console.log(response);
    },
    (error : any)=>{
      console.log(error);
    }
    )
  }







  onClickSearchBtn() : void
  {
    console.log(this.SearchValue);
    console.log("inside the search btn");
    this.router.navigate(['/search'],{queryParams:{query:this.SearchValue}});
    
    
  }




}
