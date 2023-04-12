import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Product from '../Product';
import { ProductService } from '../product.service';
import { ProfileService } from '../profile.service';
import User from '../User';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {
  public user: User = new User();
  querySub: Subscription[] = [];
  warning: string = "";
  success: string = "";
  continue: Boolean = true;
  product: Product = {
    id: 'none',
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0
    },
    views: 0,
    addedToCart: 0,
    reviews: [],
    seller: ''
  };

  constructor(private prodServ: ProductService, private router: Router, private profile: ProfileService ) { }

  ngOnDestroy(): void {
    this.querySub.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.user = this.profile.getUser();
  }

  onSubmit(f: NgForm): Boolean | void {
    this.product.image = fileURL;
    this.product.seller = this.user.username
    this.continue = true

    Object.values(this.product).forEach((value: any) => {
      if (value === '') {
        this.warning = "All Fields Are Mandatory!"
        this.continue = false
      }
    })

    if (!this.continue) {
      return false
    }
    
    console.log(this.product);

    this.success = "Successfully Added The Product! Redirecting...";
    this.warning = ""
    this.querySub.push(
      this.prodServ.addProduct(this.product).subscribe({
        next: (success) => { 
          console.log(success)
          setTimeout(() => {
            this.router.navigate(['/seller']);
          }, 2500);
        },
        error: (err) => { 
          console.log(err)
          setTimeout(() => {
            this.router.navigate(['/seller']);
          }, 2500);
        }
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