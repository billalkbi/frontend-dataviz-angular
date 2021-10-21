import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dashboard } from 'src/app/models/dashboard';
import { DashboardsService } from 'src/app/services/dashboards.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'node-add-dash-dialog',
  templateUrl: './add-dash-dialog.component.html',
  styleUrls: ['./add-dash-dialog.component.css']
})
export class AddDashDialogComponent implements OnInit {

  hide = true;
  DashboardForm: any;
  errorMessage: string |undefined;
  constructor(public dialogRef: MatDialogRef<AddDashDialogComponent>,
             @Inject(MAT_DIALOG_DATA) public data: dashboard,
              private formBuilder : FormBuilder,
              private dashboardsService : DashboardsService,
              protected notificationService : NotificationService) { }

  ngOnInit(): void {

    this.DashboardForm= this.formBuilder.group({
      name : this.formBuilder.control("",[ Validators.required, Validators.minLength(5)]),
      description : this.formBuilder.control("",[ Validators.required, Validators.minLength(5)]),
      created : this.formBuilder.control("",[ Validators.required]),
      UserId:localStorage.getItem('idUser'),
      ProjetId :localStorage.getItem('ProjectId')


    });
  }

  public saveAdd(): void {
    this.dashboardsService.addDashboard(this.DashboardForm.value).subscribe(() => {
      console.log(this.DashboardForm.value);
      this.notificationService.success('dashboard ajouter avec succes !');

    }, (err) => {
      this.errorMessage=err;
      this.notificationService.warn('echec dajouter veuillez réesseyer !');
      console.log(this.DashboardForm.value);

  });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
