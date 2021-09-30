import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardsService } from 'src/app/services/dashboards.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'node-delete-dash-dialog',
  templateUrl: './delete-dash-dialog.component.html',
  styleUrls: ['./delete-dash-dialog.component.css']
})
export class DeleteDashDialogComponent implements OnInit {

  errorMessage: any;
  dashboard: any;
   constructor(private dashboardsService: DashboardsService,
               protected notificationService : NotificationService,
               public dialogRef: MatDialogRef<DeleteDashDialogComponent >,
               @Inject(MAT_DIALOG_DATA) public id: any
              ) { }

   ngOnInit( ): void {
     this.dashboardsService.getDashboard(this.id)
     .subscribe(dashboard=>this.dashboard=dashboard)
   }


   onNoClick(): void {
     this.dialogRef.close();
    }

   confirmDelete(id : string){
     this.dashboardsService.deleteDashboard(this.id,)
     .subscribe(() => {
         console.log('supression avec succes');
         this.notificationService.success('suppression effectuée avec succes !');

       }, (err) => {
         this.errorMessage=err;
         this.notificationService.warn('erreur veuillez réesseyer !');


     });

   }


}
