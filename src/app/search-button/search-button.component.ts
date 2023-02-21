import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Product from '../Product';


@Component({
  selector: 'app-search-button',
  templateUrl: './search-button.component.html',
  styleUrls: ['./search-button.component.css']
})
export class SearchButtonComponent implements OnInit {

  public SearchValue : string = "Mens Jacket";

  constructor(private http : HttpClient) {
  }
  
  ngOnInit(): void {
  };

  searchProduct(Title : string) : void
  {
    const productTitle = Title;
    const data = {
      title: productTitle
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
    this.searchProduct(this.SearchValue);
    console.log("inside the search btn");
  }

  


}
