import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Graphe } from 'src/app/models/graphe';
import { DashboardsService } from 'src/app/services/dashboards.service';
@Component({
  selector: 'node-tree-map-chart',
  templateUrl: './tree-map-chart.component.html',
  styleUrls: ['./tree-map-chart.component.css']
})
export class TreeMapChartComponent implements OnInit {

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
  gradient: boolean = false;
  animations: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };



  onSelect(event:any) {
    console.log(event);
  }

  labelFormatting(c:any) {
    return `${(c.label)} Population`;
  }


}
