import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { dashboard } from 'src/app/models/dashboard';
import { DashboardsService } from 'src/app/services/dashboards.service';
import { AddDashDialogComponent } from'./add-dash-dialog/add-dash-dialog.component'
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
  projectId :any;
  displayedColumns: string[] = ['id', 'name', 'description', 'creacted', 'action'];


  constructor(private dashboardService : DashboardsService,
              public dialog: MatDialog,
              private route : ActivatedRoute,
              private router: Router) {
                 this.route.queryParams.subscribe((params:any) =>{
                  this.projectId = this.route.snapshot.params.projectId;
                  localStorage.setItem('ProjectId',this.projectId)

                   })
                 this.getDashboards();
              }
  ngOnInit(): void {

  }

  getDashboards() : void{

    setTimeout(() => {
      localStorage.setItem('ProjectId',this.projectId);
     this.dashboardService.getDashboards(this.projectId)
       .pipe(first())
       .subscribe(dashboards => this.dataDashboards = dashboards);
   }, 300);

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
         this.getDashboards();
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
     this.getDashboards();
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
      this.getDashboards();
      this.isPopupOpened = false;
    });
  }

  detailDashboard(id: number){

    let link = ['home','detail-dash', id];
    this.router.navigate(link);
   }

}


