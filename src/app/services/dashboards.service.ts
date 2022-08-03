import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Chart } from '../models/Chart';
import { dashboard } from '../models/dashboard';
import { Graphe } from '../models/graphe';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {

  REST_API: string = environment.ENDPOINTS.api

  constructor(private http: HttpClient) { }

  getDashboards(id :any) {
    const url = `${this.REST_API}/projets/${id}`;
    return this.http.get<dashboard>(url).pipe(

      catchError(this.handleError<any>('getDashboards'))
    );
  }

  getDashboard(id: string): Observable<dashboard> {
    const url = `${this.REST_API}/dashboard/${id}`;
    return this.http.get<dashboard>(url).pipe(

      catchError(this.handleError<any>('getDashboard'))
    );

  }

  addDashboard(dashboard: dashboard): Observable<any> {
    let API_URL = `${this.REST_API}/dashboards`;
    return this.http.post(API_URL,dashboard)
      .pipe(
        catchError(this.handleError<any>('addDashboard'))

      )
  }

  updateDashboard(id:any, dashboard:dashboard): Observable<any> {
    let API_URL = `${this.REST_API}/dashboard/${id}`;
    return this.http.put(API_URL,dashboard)
      .pipe(
        catchError(this.handleError<any>('updateDashboard'))
      )
  }

  deleteDashboard(id: string): Observable<dashboard> {
    const url = `${this.REST_API}/dashboard/${id}`;
    return this.http.delete<dashboard>(url).pipe(
      catchError(this.handleError<any>('deleteDashboard'))
    )
  }

  getCharts(id: string){
    const url = `${this.REST_API}/file${id}`;
    return this.http.get<Chart>(url).pipe(
      catchError(this.handleError<any>('getCharts'))
    );

  }

  getGraphe() {
    return this.http.get<Graphe[]>(`${this.REST_API}/graphe`)
  }

  addGraphe(formData: any){
    let API_URL = `${this.REST_API}/file/upload`;
    return this.http.post(API_URL,dashboard)
      .pipe(
        catchError(this.handleError<any>('addDashboard'))

      )

  }

  private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			console.log(`${operation} failed: ${error.message}`);

			return of(result as T);
		};
	}
}
