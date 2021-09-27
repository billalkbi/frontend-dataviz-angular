import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { dashboard } from 'src/app/models/dashboard';
import { DashboardsService } from 'src/app/services/dashboards.service';
import { AddDashDialogComponent } from './add-dash-dialog/add-dash-dialog.component';
import { DeleteDashDialogComponent } from './delete-dash-dialog/delete-dash-dialog.component';
import { EditDashDialogComponent } from './edit-dash-dialog/edit-dash-dialog.component';



@Component({
  selector: 'node-dashboard',
  templateUrl: './list-dashboards.component.html',
  styleUrls: ['./list-dashboards.component.css']
})
export class listDashboardsComponent implements OnInit {
  isPopupOpened =true;
  dataDashboards : dashboard []=[];
  name: any;
  displayedColumns: string[] = ['id', 'name', 'description', 'creacted', 'action'];
  router: any;

  constructor(private dashboardService : DashboardsService,
              public dialog: MatDialog,) { }

  ngOnInit(): void {


  }

  getDashboards(id : any) : void{
    this.dashboardService.getDashboards(id)
            .pipe(first())
            .subscribe(dashboards => this.dataDashboards = dashboards);

  }

  search(){
    if(this.name==""){
      this.ngOnInit();

    }else{
      this.dataDashboards=this.dataDashboards.filter(res=>{
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      })
    }
  }

  addDashboard(){
    this.isPopupOpened = true;
        const dialogRef = this.dialog.open(AddDashDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {

      this.isPopupOpened = false;
    });
  }

  editDashboard(id: string) {
    this.isPopupOpened = true;
        const dialogRef = this.dialog.open(EditDashDialogComponent, {
      data: id

    });
    console.log(id);
    dialogRef.afterClosed().subscribe(result => {

      this.isPopupOpened = false;
    });
  }

  deleteDashboard(id: string) {
    this.isPopupOpened = true;
        const dialogRef = this.dialog.open(DeleteDashDialogComponent, {
      data: id

    });
    console.log(id);
    dialogRef.afterClosed().subscribe(result => {

      this.isPopupOpened = false;
    });
  }

  detailDashboard(id: string){

    let link = ['/dashboards', id];
    this.router.navigate(link);
   }



}


