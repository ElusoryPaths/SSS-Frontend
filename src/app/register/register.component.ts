import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import User from '../User';
import { AuthService } from '../auth.service';
import Buyer from '../Buyer';
import Address from '../Address';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  user: User = new User();
  warning: string = "";
  validatePass: boolean = false;
  passCheck: string = "";
  querySub: Subscription[] = [];
  
  addressFieldNames = ["Address Line 1", "Address Line 2", "City", "Province", "Postal Code", "Country"];
  addressFields = ["addressLine1", "addressLine2", "city", "province", "postalCode", "country"];

  constructor(private auth: AuthService, private router: Router) { 
    this.user.address = new Address();
  }

  ngOnDestroy(): void {
    this.querySub.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.user.accountType = "buyer"
  }

  onTypeChange(event: any) : void {
    this.user.accountType
  }
  
  confirmPassword() {
    if (this.user.password == this.passCheck) this.validatePass = true;
    else this.validatePass = false;
  }

  onSubmit(f: NgForm): void {
    this.querySub.push(this.auth.register(this.user).subscribe(
      (success) => {
        this.router.navigate(['/login']);
        console.log(success)
      },
      (err) => {
        this.warning = "Missing required fields!";
        console.log(err)
      }
    ))

  }
}
