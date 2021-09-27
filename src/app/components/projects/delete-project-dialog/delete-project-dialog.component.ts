import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsService } from 'src/app/services/projects.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'node-delete-project-dialog',
  templateUrl: './delete-project-dialog.component.html',
  styleUrls: ['./delete-project-dialog.component.css']
})
export class DeleteProjectDialogComponent implements OnInit {

  errorMessage: any;
  project: any;



   constructor(private projectsService: ProjectsService,
               protected notificationService : NotificationService,
               public dialogRef: MatDialogRef<DeleteProjectDialogComponent >,
               @Inject(MAT_DIALOG_DATA) public id: any
              ) { }

   ngOnInit( ): void {
     this.projectsService.getProject(this.id)
     .subscribe(project=>this.project=project)
   }


   onNoClick(): void {
     this.dialogRef.close();
    }

   confirmDelete(id : string){
     this.projectsService.deleteProject(this.id,)
     .subscribe(() => {
         console.log('Data deleted successfully!');
         this.notificationService.success('suppression effectuée avec succes !');

       }, (err) => {
         this.errorMessage=err;
         this.notificationService.warn('erreur veuillez réesseyer !');


     });

   }


}
