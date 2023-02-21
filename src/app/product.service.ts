import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Product from './Product';
import Review from './Review';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = "https://sss-backend.vercel.app"
  constructor(private http: HttpClient) { }

  public getRecentProducts(): Observable<any> {
    return this.http.get<Array<Product>>(`${this.apiUrl}/products/recent`)
  } 

  public getProductById(id: string): Observable<any> {
    return this.http.get<Product>(`${this.apiUrl}/product/${id}`)
  }

  public addProductById(id: string, review: Review): Observable<any> {
    return this.http.post(`${this.apiUrl}/product/${id}/addreview`, review)
  }

}
