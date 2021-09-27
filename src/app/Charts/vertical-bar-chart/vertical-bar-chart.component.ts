import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Graphe } from 'src/app/models/graphe';
import { DashboardsService } from 'src/app/services/dashboards.service';
@Component({
  selector: 'node-vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrls: ['./vertical-bar-chart.component.css']
})
export class VerticalBarChartComponent implements OnInit {

  DataGraphe: Graphe []=[];
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
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };



  onSelect(event:any) {
    console.log(event);
  }




}
