import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import Product from '../Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {
  querySub: Subscription[] = [];
  warning: string = "";
  product: Product = {
    id: '',
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0
    },
    reviews: []
  };

  constructor(private prodServ: ProductService) { }

  ngOnDestroy(): void {
    this.querySub.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {

  }

  onSubmit(f: NgForm): void {
    this.product.image = fileURL;
    console.log(this.product);
    this.querySub.push(
      this.prodServ.addProduct(this.product).subscribe({
        next: (success) => { console.log(success) },
        error: (err) => { console.log(err) }
      })
    )
  }

  onchange(event: any) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      fileURL = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

let fileURL = "";