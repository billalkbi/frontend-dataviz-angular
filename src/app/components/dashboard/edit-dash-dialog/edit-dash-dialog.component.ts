import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardsService } from 'src/app/services/dashboards.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'node-edit-dash-dialog',
  templateUrl: './edit-dash-dialog.component.html',
  styleUrls: ['./edit-dash-dialog.component.css']
})
export class EditDashDialogComponent implements OnInit {

  hide = true;
  errorMessage: any;
   dashboardEditForm= new FormGroup({
    id: new FormControl('',[ Validators.required]),
    name: new FormControl('',[ Validators.required, Validators.minLength(5)]),
    description: new FormControl('',[ Validators.required, Validators.minLength(5)]),
    created: new FormControl('',[ Validators.required]),
    })
  constructor(   private dashboardService : DashboardsService,
    protected notificationService : NotificationService,
               public dialogRef: MatDialogRef<EditDashDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public id: any) { }

               onNoClick(): void {
                this.dialogRef.close();
               }


  ngOnInit() {

   this.dashboardService.getDashboard(this.id)
    .subscribe(dashboard=>{
        this.dashboardEditForm.controls.id.setValue(dashboard['id']);
        this.dashboardEditForm.controls.name.setValue(dashboard['name']);
        this.dashboardEditForm.controls.description.setValue(dashboard['description']);
        this.dashboardEditForm.controls.created.setValue(dashboard['created']);

      })
  }


 saveEdit() {

   this.dashboardService.updateDashboard(this.id,this.dashboardEditForm.value)  .subscribe(() => {
     console.log('Data updated successfully!');
     this.notificationService.success('modification effectuée avec succes !');

   }, (err) => {
           this.errorMessage=err;
           this.notificationService.warn('erreur de modificqtion veuillez réesseyer!');
           console.log(this.dashboardEditForm.value);
      });

    this.dialogRef.close();

   }



}
