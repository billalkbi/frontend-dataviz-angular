import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
              private route: ActivatedRoute,
              private router :Router,
              public dialog: MatDialog,) {

              }

  ngOnInit(): void {
    this.getProjects();

  }

  getProjects() : void{
    setTimeout(() => {

      this.projectsService.getProjects()
      .pipe(first())
      .subscribe(projects => this.dataProjects = projects);
    }, 300);

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
   this.isPopupOpened = false;
   this.getProjects();
    });
  }

  editProject(id: string) {
    this.isPopupOpened = true;
        const dialogRef = this.dialog.open(EditProjectDialogComponent, { data: id });
    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
      this.getProjects();
    });
  }

  deleteProject(id: string) {
    this.isPopupOpened = true;
        const dialogRef = this.dialog.open(DeleteProjectDialogComponent, { data: id});
    dialogRef.afterClosed().subscribe(result => {
     this.isPopupOpened = false;
     this.getProjects();
    });
  }

  getDashboards(id: string){

    localStorage.setItem('ProjectId',id);
    let link = ['home','dashboards', id];
    this.router.navigate(link);
   }



}
