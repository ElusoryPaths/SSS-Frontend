import { Component, Input, OnInit } from '@angular/core';
import User from '../User';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent implements OnInit {

  @Input() type:string = 'text';
  @Input() user!:User;
  @Input() field!:string;
  @Input() require:boolean = true;


  constructor() { }

  ngOnInit(): void {
  }

}
