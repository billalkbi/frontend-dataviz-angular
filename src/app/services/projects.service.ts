import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Project } from '../models/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  REST_API: string = environment.ENDPOINTS.api

  constructor(private http: HttpClient) { }

  getProjects() {
    const id =localStorage.getItem('idUser');
    console.log(id);

    return this.http.get<Project[]>(`${this.REST_API}/users/${id}`)
  }


  getProject(id: string): Observable<Project> {
    const url = `${this.REST_API}/projet/${id}`;
    return this.http.get<Project>(url).pipe(
      catchError(this.handleError)
    );

  }

  addProject(project: Project): Observable<any> {
    let API_URL = `${this.REST_API}/projets`;
    return this.http.post(API_URL,project)
      .pipe(
        catchError(this.handleError)

      )
  }

  updateProject(id:any, project:Project): Observable<any> {
    let API_URL = `${this.REST_API}/projet/${id}`;
    return this.http.put(API_URL,project)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteProject(id: any){
    const url = `${this.REST_API}/projet/${id}`;
    return this.http.delete<Project>(url).pipe(
      catchError(this.handleError)
    )

  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
