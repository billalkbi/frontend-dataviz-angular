import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DashboardsService } from 'src/app/services/dashboards.service';
import { NotificationService } from 'src/app/services/notification.service';
interface Type {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'node-add-graphe.Dialog',
  templateUrl: './add-graphe.Dialog.component.html',
  styleUrls: ['./add-graphe.Dialog.component.css']
})
export class AddGrapheDialogComponent implements OnInit {
  selectedValue: string | undefined;
  addGrapheForm: any;
  errorMessage: string |undefined;


  types: Type[] = [
    {value: 'bubble-chart', viewValue: 'bubble-chart'},
    {value: 'gauge-chart', viewValue: 'gauge-chart'},
    {value: 'horizontal-bar-chart', viewValue: 'horizontal-bar-chart'},
    {value: 'vertical-bar-chart', viewValue: 'vertical-bar-chart'},
    {value: 'number-card-chart', viewValue: 'number-card-chart'},
    {value: 'pie-chart', viewValue: 'pie-chart'},
    {value: 'pie-gird-chart', viewValue: 'pie-gird-chart'},
    {value: 'tree-map-chart', viewValue: 'tree-map-chart'}
  ];

  constructor(public dialogRef: MatDialogRef<AddGrapheDialogComponent>,
              private formBuilder : FormBuilder,
              private dashboardsService: DashboardsService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.addGrapheForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      type: new FormControl('', [Validators.required, Validators.minLength(3)]),
      file: new FormControl('', [Validators.required]),

    });
  }


  uploadFile(event :any){
    console.log('file selected');

  }

  public saveAdd(): void {
    const formData = new FormData();

    formData.append('file', this.addGrapheForm.get('file').value);

    this.dashboardsService.addGraphe(formData).subscribe(() => {
      console.log(this.addGrapheForm.file.value);
      this.notificationService.success('graphe ajouter avec succes !');

    }, (err) => {
      this.errorMessage=err;
      console.log('erreur',formData);
      this.notificationService.warn('echec dajouter veuillez réesseyer !');
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


