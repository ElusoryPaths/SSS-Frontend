import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public chart: any;
  @Input() views: number = 0;
  @Input() cartViews: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Product Analytics'], 
	       datasets: [
          {
            label: "Product Views",
            data: [this.views],
            backgroundColor: 'blue'
          },
          {
            label: "# Added to Cart",
            data: [this.cartViews],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }


}
