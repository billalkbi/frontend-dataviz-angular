import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { dashboard } from 'src/app/models/dashboard';
import { DashboardsService } from 'src/app/services/dashboards.service';
import { AddGrapheDialogComponent } from './add-graphe.Dialog/add-graphe.Dialog.component';


@Component({
  selector: 'node-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isPopupOpened = true;
    dataDashboards: dashboard []|undefined;
  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              private dashboardsService : DashboardsService) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.getDashboards(id);
  }

  getDashboards(id: any){
    this.dashboardsService.getDashboards(id)
    .pipe(first())
    .subscribe(dashbords => this.dataDashboards = dashbords);

  }


  addGraphe(){
    this.isPopupOpened = true;
        const dialogRef = this.dialog.open(AddGrapheDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;


    });
  }

}
