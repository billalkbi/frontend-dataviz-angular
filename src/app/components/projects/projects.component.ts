import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Project } from 'src/app/models/projects';
import { ProjectsService } from 'src/app/services/projects.service';
import { AddProjectDialogComponent } from './add-project-dialog/add-project-dialog.component';
import { DeleteProjectDialogComponent } from './delete-project-dialog/delete-project-dialog.component';
import { EditProjectDialogComponent } from './edit-project-dialog/edit-project-dialog.component';

@Component({
  selector: 'node-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  isPopupOpened =true;
  dataProjects : Project []=[];
  name: any;
  displayedColumns: string[] = ['id', 'name', 'description', 'creacted', 'action'];

  constructor(private projectsService : ProjectsService,
              public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getProjects();

  }

  getProjects() : void{
    this.projectsService.getProjects()
            .pipe(first())
            .subscribe(projects => this.dataProjects = projects);

  }

  search(){
    if(this.name==""){
      this.ngOnInit();

    }else{
      this.dataProjects=this.dataProjects.filter(res=>{
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      })
    }
  }

  addProject(){
    this.isPopupOpened = true;
        const dialogRef = this.dialog.open(AddProjectDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      this.getProjects();
      this.isPopupOpened = false;
    });
  }

  editProject(id: string) {
    this.isPopupOpened = true;
        const dialogRef = this.dialog.open(EditProjectDialogComponent, {
      data: id

    });
    console.log(id);
    dialogRef.afterClosed().subscribe(result => {
      this.getProjects();
      this.isPopupOpened = false;
    });
  }

  deleteProject(id: string) {
    this.isPopupOpened = true;
        const dialogRef = this.dialog.open(DeleteProjectDialogComponent, {
      data: id

    });
    console.log(id);
    dialogRef.afterClosed().subscribe(result => {
      this.getProjects();
      this.isPopupOpened = false;
    });
  }


}
