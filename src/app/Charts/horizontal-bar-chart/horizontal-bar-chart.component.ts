import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Graphe } from 'src/app/models/graphe';
import { DashboardsService } from 'src/app/services/dashboards.service';
@Component({
  selector: 'node-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.css']
})
export class HorizontalBarChartComponent implements OnInit {

  DataGraphe: Graphe []=[];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private dashboardsService :DashboardsService) {

  }

  ngOnInit(): void {
    this.getGraphe();
  }

  getGraphe() : void{
    this.dashboardsService.getGraphe()
            .pipe(first())
            .subscribe(graphe => this.DataGraphe = graphe);
  }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


}
