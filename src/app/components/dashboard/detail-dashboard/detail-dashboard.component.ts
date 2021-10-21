import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { dashboard } from 'src/app/models/dashboard';
import { DashboardsService } from 'src/app/services/dashboards.service';
import { AddGrapheDialogComponent } from './add-graphe.Dialog/add-graphe.Dialog.component';
@Component({
  selector: 'node-detail-dashboard',
  templateUrl: './detail-dashboard.component.html',
  styleUrls: ['./detail-dashboard.component.css']
})
export class DetailDashboardComponent implements OnInit {

  isPopupOpened = true;
  dataDashboards: dashboard []|undefined;
  dashId: string= '1' ;
  datacharts: any;
  constructor(public dialog: MatDialog,
             private route: ActivatedRoute,
              private router: Router,
              private dashboardsService : DashboardsService) {
               this.route.queryParams.subscribe((params:any) =>{
                 this.dashId = this.route.snapshot.params.dashId;
               })
               //this.getDashboardChartsById();
               }

  ngOnInit() {

  }

  getDashboardChartsById(){
      this.dashboardsService.getCharts(this.dashId)
            .pipe(first())
            .subscribe(charts => this.datacharts = charts);
  }

  addGraphe(){
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(AddGrapheDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

  getDashboards(){
    const id=localStorage.getItem('ProjectId');
    let link = ['home','dashboards', id];
    this.router.navigate(link);
  }

  savePositions(){

  }



}
