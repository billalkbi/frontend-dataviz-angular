import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { dashboard } from '../models/dashboard';
import { Graphe } from '../models/graphe';
import { User } from '../models/users';
@Injectable({
  providedIn: 'root'
})
export class DashboardsService {

  REST_API: string = environment.ENDPOINTS.api

  constructor(private http: HttpClient) { }

  getDashboards() {
    const url = `${this.REST_API}/dashboards`;
    return this.http.get<User>(url).pipe(

      catchError(this.handleError<any>('getDashboards'))
    );
  }

  getDashboard(id: string): Observable<dashboard> {
    const url = `${this.REST_API}/dashboards/${id}`;
    return this.http.get<dashboard>(url).pipe(

      catchError(this.handleError<any>('getDashboard'))
    );

  }

  addDashboard(project: dashboard): Observable<any> {
    let API_URL = `${this.REST_API}/projets`;
    return this.http.post(API_URL,project)
      .pipe(
        catchError(this.handleError<any>('addDashboard'))

      )
  }

  updateDashboard(id:any, dashboard:dashboard): Observable<any> {
    let API_URL = `${this.REST_API}/dashboards/${id}`;
    return this.http.put(API_URL,dashboard)
      .pipe(
        catchError(this.handleError<any>('updateDashboard'))
      )
  }

  deleteDashboard(id: string): Observable<dashboard> {
    const url = `${this.REST_API}/dashboards/${id}`;
    return this.http.delete<dashboard>(url).pipe(
      catchError(this.handleError<any>('deleteDashboard'))
    )
  }


  getGraphe() {
    return this.http.get<Graphe[]>(`${this.REST_API}/graphe`)
  }

  private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			console.log(`${operation} failed: ${error.message}`);

			return of(result as T);
		};
	}
}
