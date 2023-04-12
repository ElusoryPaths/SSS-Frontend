import { Component, Input, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.css']
})
export class FormErrorComponent implements OnInit {

  @Input() name!: string;
  @Input() model!: NgModel;

  constructor() { }

  ngOnInit(): void {
  }

}
