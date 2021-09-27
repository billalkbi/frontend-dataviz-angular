import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Graphe } from 'src/app/models/graphe';
import { DashboardsService } from 'src/app/services/dashboards.service';
@Component({
  selector: 'node-pie-grid-chart',
  templateUrl: './pie-grid-chart.component.html',
  styleUrls: ['./pie-grid-chart.component.css']
})
export class PieGridChartComponent implements OnInit {

   // options
   showLegend: boolean = true;
   showLabels: boolean = true;

   colorScheme = {
     domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
   };

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


   onSelect(event:any) {
     console.log(event);
   }


}
