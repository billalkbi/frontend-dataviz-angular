import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsService } from 'src/app/services/projects.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'node-edit-project-dialog',
  templateUrl: './edit-project-dialog.component.html',
  styleUrls: ['./edit-project-dialog.component.css']
})
export class EditProjectDialogComponent implements OnInit {
  hide = true;
  errorMessage: any;
   ProjectEditForm= new FormGroup({
    id: new FormControl('',[ Validators.required]),
    name: new FormControl('',[ Validators.required, Validators.minLength(5)]),
    description: new FormControl('',[ Validators.required, Validators.minLength(5)]),
    created: new FormControl('',[ Validators.required]),

  })
  constructor(  private projectsService : ProjectsService,
                protected notificationService : NotificationService,
               public dialogRef: MatDialogRef<EditProjectDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public id: any) { }

               onNoClick(): void {
                this.dialogRef.close();
               }


  ngOnInit() {

   this.projectsService.getProject(this.id)
    .subscribe(project=>{

        this.ProjectEditForm.controls.id.setValue(project['id']);
        this.ProjectEditForm.controls.name.setValue(project['name']);
        this.ProjectEditForm.controls.description.setValue(project['description']);
        this.ProjectEditForm.controls.created.setValue(project['created']);

      })
  }


 saveEdit() {

   this.projectsService.updateProject(this.id,this.ProjectEditForm.value)  .subscribe(() => {
     console.log('Data updated successfully!');
     this.notificationService.success('modification effectuée avec succes !');

   }, (err) => {
           this.errorMessage=err;
           this.notificationService.warn('erreur de modificqtion veuillez réesseyer!');
           console.log(this.ProjectEditForm.value);
      });

    this.dialogRef.close();

   }



}
