import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Graphe } from 'src/app/models/graphe';
import { dashboardsService } from 'src/app/services/dashboards.service';

@Component({
  selector: 'node-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {



  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  DataGraphe: Graphe []=[];
  constructor(private dashboardsService :dashboardsService) { }

  ngOnInit(): void {
    this.getGraphe();
  }

  getGraphe() : void{
    this.dashboardsService.getGraphe()
            .pipe(first())
            .subscribe(graphe => this.DataGraphe = graphe);
  }



  onSelect(data : any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }



}
