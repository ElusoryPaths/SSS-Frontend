import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import User from '../User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public user: User = new User();
  public warning: string = "";
  querySub: Subscription[] = [];

  constructor(private auth: AuthService, private router: Router) { }

  ngOnDestroy(): void {
    this.querySub.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    this.user.name = this.user.firstName + " " + this.user.lastName
    this.querySub.push(this.auth.register(this.user).subscribe(
      (success) => {
        this.router.navigate(['/']);
        console.log(success)
      },
      (err) => {
        this.warning = err.error.message;
      }
    ))

  }
}
