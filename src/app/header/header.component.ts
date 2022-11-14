import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  token: any;

  constructor(private router: Router) { }

  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {

   
  }


}
