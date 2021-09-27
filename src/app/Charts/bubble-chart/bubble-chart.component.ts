import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Graphe } from 'src/app/models/graphe';
import { DashboardsService } from 'src/app/services/dashboards.service';
@Component({
  selector: 'node-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit {
  DataGraphe: Graphe []=[];

view:[number, number]=[900,900];

constructor(private dashboardsService :DashboardsService) { }

ngOnInit(): void {
  this.getGraphe();
}

getGraphe() : void{
  this.dashboardsService.getGraphe()
          .pipe(first())
          .subscribe(graphe => this.DataGraphe = graphe);
}

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Sales';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Months';
  maxRadius: number = 20;
  minRadius: number = 5;
  yScaleMin: number = 70;
  yScaleMax: number = 85;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };



  onSelect(data : any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data : any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data : any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }



}
