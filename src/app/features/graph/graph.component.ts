import { Component } from '@angular/core';
import { ChartData, ChartType, plugins } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graph',
  imports: [BaseChartDirective],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent {
 // create line chart with ng2-charts
  public lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset', // mandatory
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  // top = 'top' as ChartType
  public lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };

  public lineChartLegend = true;
  // public lineChartType = 'line';
}
