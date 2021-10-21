import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/models/projects';
import { ProjectsService } from 'src/app/services/projects.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'node-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.css']
})
export class AddProjectDialogComponent implements OnInit {
  hide = true;
  addProjectForm: any;
  errorMessage: string |undefined;
  constructor(public dialogRef: MatDialogRef<AddProjectDialogComponent>,
             @Inject(MAT_DIALOG_DATA) public data: Project,

              private formBuilder : FormBuilder,
              private projectsService : ProjectsService,
              protected notificationService : NotificationService) { }

  ngOnInit(): void {

    this.addProjectForm= this.formBuilder.group({
      name : this.formBuilder.control("",[ Validators.required, Validators.minLength(5)]),
      description : this.formBuilder.control("",[ Validators.required, Validators.minLength(5)]),
      created : this.formBuilder.control("",[ Validators.required]),
      UserId:localStorage.getItem('idUser')

    });
  }

  public saveAdd(): void {
    this.projectsService.addProject(this.addProjectForm.value).subscribe(() => {
      console.log( this.addProjectForm.value)
      this.notificationService.success('projet ajouter avec succes !');

    }, (err) => {
      this.errorMessage=err;
      this.notificationService.warn('echec dajouter veuillez réesseyer !');
      console.log(this.addProjectForm.value);

  });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
