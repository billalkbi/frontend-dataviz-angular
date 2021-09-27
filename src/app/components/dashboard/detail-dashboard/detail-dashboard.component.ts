import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DashboardsService } from 'src/app/services/dashboards.service';
import { AddGrapheDialogComponent } from '../add-graphe.Dialog/add-graphe.Dialog.component';
@Component({
  selector: 'node-detail-dashboard',
  templateUrl: './detail-dashboard.component.html',
  styleUrls: ['./detail-dashboard.component.css']
})
export class DetailDashboardComponent implements OnInit {
  isPopupOpened = true;
  constructor(public dialog: MatDialog,
              private dashboardsService : DashboardsService) { }

  ngOnInit() {
  }


  addGraphe(){
    this.isPopupOpened = true;
        const dialogRef = this.dialog.open(AddGrapheDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;


    });
  }

}
